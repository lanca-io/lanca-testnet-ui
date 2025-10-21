import type { Balance } from '@/stores/balances/types'
import { useEffect, useCallback, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useBalancesStore } from '@/stores/balances/useBalancesStore'
import { useAccount } from 'wagmi'
import { useChainsStore } from '@/stores/chains/useChainsStore'
import { Address, erc20Abi } from 'viem'
import { getPublicClient } from '@/utils/client'

const SYMBOL = 'USDC'
const DECIMALS = 6

const DEFAULT_BALANCE: Balance = {
	balance: '0',
	symbol: SYMBOL,
	decimals: DECIMALS,
}

export const useLoadBalances = () => {
	const { address } = useAccount()
	const { chains } = useChainsStore()
	const { setBalances, setLoading, setBalance } = useBalancesStore()

	const fetchChainBalance = useCallback(
		async (chainId: number): Promise<Balance> => {
			const client = getPublicClient(chainId)
			const chain = chains[chainId]
			const tokenAddress = chain?.contracts?.usdc_e

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

	const fetchAllBalances = useCallback(async (): Promise<[number, Balance][]> => {
		if (!address) return []

		const promises = Object.values(chains).map(async c => {
			const balance = await fetchChainBalance(Number(c.id))
			return [Number(c.id), balance] as [number, Balance]
		})

		const results = await Promise.allSettled(promises)
		return results
			.filter(r => r.status === 'fulfilled')
			.map(r => (r as PromiseFulfilledResult<[number, Balance]>).value)
	}, [address, chains, fetchChainBalance])

	const refetchChains = useCallback(
		async (chainIds: number[]) => {
			if (!address) return

			const results = await Promise.all(
				chainIds.map(async id => {
					try {
						const balance = await fetchChainBalance(id)
						return [id, balance] as [number, Balance]
					} catch (error) {
						console.error(`Failed refetch for chain ${id}:`, error)
						return null
					}
				}),
			)

			results.forEach(result => {
				if (result) setBalance(result[0], result[1])
			})
		},
		[address, fetchChainBalance, setBalance],
	)

	const { data, isLoading } = useQuery({
		queryKey: ['balances', address],
		queryFn: fetchAllBalances,
		enabled: !!address,
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

	return useMemo(
		() => ({
			refetchChains,
			isLoading,
		}),
		[refetchChains, isLoading],
	)
}
