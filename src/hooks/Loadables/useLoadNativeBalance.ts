import { useEffect, useCallback } from 'react'
import { Status } from '@lanca/sdk'
import { useQuery } from '@tanstack/react-query'
import { useBalancesStore } from '@/stores/balances/useBalancesStore'
import { useAccount } from 'wagmi'
import { useChainsStore } from '@/stores/chains/useChainsStore'
import { usePublicClient } from '../usePublicClient'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'
import { useFormStore } from '@/stores/form/useFormStore'
import { BalanceType } from '@/stores/balances/types'

export const useLoadNativeBalance = () => {
	const { address } = useAccount()
	const { chains } = useChainsStore()
	const { setValue, setLoading } = useBalancesStore()
	const { txStatus } = useTxExecutionStore()
	const { sourceChain } = useFormStore()
	const { create } = usePublicClient()

	const fetchSourceNativeBalance = useCallback(async (): Promise<string> => {
		const chainId = sourceChain?.id ? Number(sourceChain.id) : undefined
		if (!address || !chainId) return '0'

		const chain = Object.values(chains).find(c => Number(c.id) === chainId)
		if (!chain) return '0'

		const client = create(chainId)

		try {
			const timeoutPromise = new Promise<never>((_, reject) =>
				setTimeout(() => reject(new Error(`Native balance fetch timeout for chain ${chainId}`)), 20000),
			)
			const balancePromise = client.getBalance({ address })
			const balance = await Promise.race([balancePromise, timeoutPromise])
			return balance.toString()
		} catch (error) {
			console.error(`Source chain ${chainId} native balance fetch failed:`, error)
			return '0'
		}
	}, [address, sourceChain?.id, chains])

	const {
		data: nativeBalanceData,
		isLoading: nativeBalanceLoading,
		refetch: refetchNativeBalance,
	} = useQuery({
		queryKey: ['sourceNativeBalance', address, sourceChain?.id],
		queryFn: fetchSourceNativeBalance,
		enabled: !!address && !!sourceChain?.id,
		staleTime: 30_000,
		retry: 2,
		refetchOnWindowFocus: false,
	})

	useEffect(() => {
		setValue(BalanceType.FromNative, nativeBalanceData ?? '0')
		setLoading(BalanceType.FromNative, nativeBalanceLoading)
	}, [nativeBalanceData, nativeBalanceLoading, setValue, setLoading])

	useEffect(() => {
		if (txStatus === Status.SUCCESS) {
			const timeout = setTimeout(() => {
				refetchNativeBalance()
			}, 300)
			return () => clearTimeout(timeout)
		}
	}, [txStatus, refetchNativeBalance])
}
