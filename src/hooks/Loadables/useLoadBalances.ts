import type { Balance } from '@/stores/balances/types'
import { useEffect, useCallback } from 'react'
import { Status } from '@lanca/sdk'
import { useQuery } from '@tanstack/react-query'
import { useBalancesStore } from '@/stores/balances/useBalancesStore'
import { useAccount } from 'wagmi'
import { useChainsStore } from '@/stores/chains/useChainsStore'
import { Address, erc20Abi } from 'viem'
import { getPublicClient } from '@/utils/client'
import { TokenAddresses } from '@/configuration/addresses'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'

const SYMBOL = 'tCERO'
const DECIMALS = 18

export const useLoadBalances = () => {
	const { address } = useAccount()
	const { chains } = useChainsStore()
	const { setBalances, setLoading } = useBalancesStore()
	const { txStatus } = useTxExecutionStore()

	const handleFetchBalances = useCallback(async () => {
		if (!address) return []

		const chainArray = Object.values(chains)

		const balances = await Promise.all(
			chainArray.map(async chain => {
				const client = getPublicClient(Number(chain.id))
				const tokenAddress = TokenAddresses[Number(chain.id)]
				if (!tokenAddress) {
					console.warn(`No token address found for chain ${chain.id}`)
					return {
						chainId: Number(chain.id),
						balance: '0',
						symbol: SYMBOL,
						decimals: DECIMALS,
					}
				}
				try {
					const balance = await client.readContract({
						address: tokenAddress as Address,
						abi: erc20Abi,
						functionName: 'balanceOf',
						args: [address],
					})
					return {
						chainId: Number(chain.id),
						balance: balance.toString(),
						symbol: SYMBOL,
						decimals: DECIMALS,
					}
				} catch (error) {
					console.error(`Error fetching balance for chain ${chain.id}:`, error)
					return {
						chainId: Number(chain.id),
						balance: '0',
						symbol: SYMBOL,
						decimals: DECIMALS,
					}
				}
			}),
		)

		return balances
	}, [address, chains])

	const {
		data: balances,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['balances', address],
		queryFn: handleFetchBalances,
		enabled: !!address,
	})

	useEffect(() => {
		if (txStatus === Status.SUCCESS) {
			refetch()
		}
	}, [txStatus, refetch])

	useEffect(() => {
		setLoading(isLoading)
	}, [isLoading, setLoading])

	useEffect(() => {
		if (balances) {
			const balancesRecord = balances.reduce(
				(acc, { chainId, balance, symbol, decimals }) => {
					acc[chainId] = { balance, symbol, decimals }
					return acc
				},
				{} as Record<number, Balance>,
			)
			setBalances(balancesRecord)
		}
	}, [balances, setBalances])

	return {
		refetch,
		isLoading,
	}
}
