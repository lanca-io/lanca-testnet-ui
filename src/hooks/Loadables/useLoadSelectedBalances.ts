import type { Balance } from '@/stores/balances/types'
import { useEffect, useCallback } from 'react'
import { Status } from '@lanca/sdk'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useBalancesStore } from '@/stores/balances/useBalancesStore'
import { useAccount } from 'wagmi'
import { Address, erc20Abi } from 'viem'
import { getPublicClient } from '@/utils/client'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'
import { useFormStore } from '@/stores/form/useFormStore'
import { BalanceType } from '@/stores/balances/types'
import { useChainsStore } from '@/stores/chains/useChainsStore'

const SYMBOL = 'USDC' as const
const DECIMALS = 6 as const

const DEFAULT_BALANCE: Balance = {
	balance: '0',
	symbol: SYMBOL,
	decimals: DECIMALS,
}

export const useLoadSelectedBalances = () => {
	const { address } = useAccount()
	const { chains } = useChainsStore()
	const { setValue, setLoading } = useBalancesStore()
	const { sourceChain, destinationChain } = useFormStore()
	const { txStatus } = useTxExecutionStore()

	const fetchChainBalance = useCallback(
		async (chainId: number): Promise<Balance> => {
			const client = getPublicClient(chainId)
			const chain = chains[chainId]
			const tokenAddress = chain?.contracts.usdc_e

			if (!tokenAddress || !address) return DEFAULT_BALANCE

			try {
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
				return { balance: balance.toString(), symbol: SYMBOL, decimals: DECIMALS }
			} catch (error) {
				console.error(`Chain ${chainId} balance fetch failed:`, error)
				return DEFAULT_BALANCE
			}
		},
		[address],
	)

	const fetchBalance = useCallback(
		async (chainId?: number): Promise<string> => {
			if (!address || !chainId) return '0'
			const { balance } = await fetchChainBalance(chainId)
			return balance
		},
		[address, fetchChainBalance],
	)

	const {
		data: fromBalanceData,
		isLoading: fromBalanceLoading,
		refetch: refetchFromBalance
	}: UseQueryResult<string> = useQuery({
		queryKey: ['fromBalance', address, sourceChain?.id],
		queryFn: () => fetchBalance(sourceChain?.id ? Number(sourceChain.id) : undefined),
		enabled: Boolean(address && sourceChain?.id),
		staleTime: 30_000,
		retry: 2,
		refetchOnWindowFocus: false,
	})

	const {
		data: toBalanceData,
		isLoading: toBalanceLoading,
		refetch: refetchToBalance
	}: UseQueryResult<string> = useQuery({
		queryKey: ['toBalance', address, destinationChain?.id],
		queryFn: () => fetchBalance(destinationChain?.id ? Number(destinationChain.id) : undefined),
		enabled: Boolean(address && destinationChain?.id),
		staleTime: 30_000,
		retry: 2,
		refetchOnWindowFocus: false,
	})

	useEffect(() => {
		setValue(BalanceType.From, fromBalanceData ?? '0')
		setLoading(BalanceType.From, fromBalanceLoading)
	}, [fromBalanceData, fromBalanceLoading, setValue, setLoading])

	useEffect(() => {
		setValue(BalanceType.To, toBalanceData ?? '0')
		setLoading(BalanceType.To, toBalanceLoading)
	}, [toBalanceData, toBalanceLoading, setValue, setLoading])

	useEffect(() => {
		if (txStatus === Status.SUCCESS) {
			const timeout = setTimeout(() => {
				refetchFromBalance()
				refetchToBalance()
			}, 300)
			return () => clearTimeout(timeout)
		}
	}, [txStatus, refetchFromBalance, refetchToBalance])
}
