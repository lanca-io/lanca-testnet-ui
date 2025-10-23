import type { Balance } from '@/stores/balances/types'
import { useEffect, useMemo } from 'react'
import { Status } from '@lanca/sdk'
import { useQuery } from '@tanstack/react-query'
import { useBalancesStore } from '@/stores/balances/useBalancesStore'
import { useAccount } from 'wagmi'
import { useChainsStore } from '@/stores/chains/useChainsStore'
import { Address, erc20Abi } from 'viem'
import { usePublicClient } from '@/hooks/usePublicClient'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'
import { useFormStore } from '@/stores/form/useFormStore'
import { BalanceType } from '@/stores/balances/types'

const SYMBOL = 'USDC'
const DECIMALS = 6

const DEFAULT_BALANCE: Balance = {
	balance: '0',
	symbol: SYMBOL,
	decimals: DECIMALS,
}

export const useLoadBalances = () => {
	const { address } = useAccount()
	const { chains, loading: chainsLoading } = useChainsStore()
	const { setBalances, setLoading, setValue } = useBalancesStore()
	const { sourceChain, destinationChain } = useFormStore()
	const { txStatus } = useTxExecutionStore()
	const { create } = usePublicClient()

	const hasChainsLoaded = useMemo(() => {
		return !chainsLoading && Object.keys(chains).length > 0
	}, [chains, chainsLoading])

	const chainIds = useMemo(() => {
		return Object.keys(chains).map(Number)
	}, [chains])

	const sourceChainId = useMemo(() => (sourceChain?.id ? Number(sourceChain.id) : undefined), [sourceChain?.id])
	const destinationChainId = useMemo(
		() => (destinationChain?.id ? Number(destinationChain.id) : undefined),
		[destinationChain?.id],
	)

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['balances', address, chainIds],
		queryFn: async (): Promise<[number, Balance][]> => {
			if (!address || !hasChainsLoaded) return []

			const promises = Object.values(chains).map(async c => {
				const chainId = Number(c.id)
				const tokenAddress = c?.contracts?.usdc_e

				if (!tokenAddress) {
					return [chainId, DEFAULT_BALANCE] as [number, Balance]
				}

				try {
					const client = create(chainId)

					const timeout = new Promise<never>((_, reject) =>
						setTimeout(() => reject(new Error(`Balance fetch timeout for chain ${chainId}`)), 20000),
					)

					const balancePromise = client.readContract({
						address: tokenAddress as Address,
						abi: erc20Abi,
						functionName: 'balanceOf',
						args: [address],
					})

					const balance = await Promise.race([balancePromise, timeout])
					return [chainId, { balance: balance.toString(), symbol: SYMBOL, decimals: DECIMALS }] as [
						number,
						Balance,
					]
				} catch (error) {
					console.error(`Chain ${chainId} balance fetch failed:`, error)
					return [chainId, DEFAULT_BALANCE] as [number, Balance]
				}
			})

			const results = await Promise.allSettled(promises)
			const fulfilled = results.filter(r => r.status === 'fulfilled')
			return fulfilled.map(r => (r as PromiseFulfilledResult<[number, Balance]>).value)
		},
		enabled: !!address && hasChainsLoaded,
		staleTime: 30_000,
		retry: 2,
		refetchOnWindowFocus: false,
	})

	useEffect(() => {
		if (data) {
			const bulkUpdate = data.reduce(
				(acc, [chainId, balance]) => {
					acc[chainId] = balance
					return acc
				},
				{} as Record<number, Balance>,
			)
			setBalances(bulkUpdate)
		}
	}, [data, setBalances])

	useEffect(() => {
		setLoading('global', isLoading)
	}, [isLoading, setLoading])

	useEffect(() => {
		if (data && sourceChainId) {
			const sourceBalance = data.find(([chainId]) => chainId === sourceChainId)
			setValue(BalanceType.From, sourceBalance?.[1].balance ?? '0')
		} else {
			setValue(BalanceType.From, '0')
		}
		setLoading(BalanceType.From, isLoading)
	}, [data, sourceChainId, isLoading, setValue, setLoading])

	useEffect(() => {
		if (data && destinationChainId) {
			const destinationBalance = data.find(([chainId]) => chainId === destinationChainId)
			setValue(BalanceType.To, destinationBalance?.[1].balance ?? '0')
		} else {
			setValue(BalanceType.To, '0')
		}
		setLoading(BalanceType.To, isLoading)
	}, [data, destinationChainId, isLoading, setValue, setLoading])

	useEffect(() => {
		if (txStatus === Status.SUCCESS) {
			const timeout = setTimeout(() => {
				refetch()
			}, 300)
			return () => clearTimeout(timeout)
		}
	}, [txStatus, refetch])

	return useMemo(
		() => ({
			isLoading,
			refetch,
		}),
		[isLoading, refetch],
	)
}
