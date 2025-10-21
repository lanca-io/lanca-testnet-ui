import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useChainsStore } from '@/stores/chains/useChainsStore'
import { fetchChainConfiguration } from '@/utils/chains'

export enum DeploymentType {
	usdc_e = 'usdc_e',
	usdc = 'usdc',
	bridge_lbf = 'bridge_lbf',
	bridge_v2 = 'bridge_v2',
	message_v2 = 'message_v2',
	orchestrator = 'orchestrator',
	message_v1 = 'message_v1',
}

export type Chain = {
	id: number
	is_testnet: boolean
	allow_usage: boolean
	name: string
	ccip_selector: string | null
	concero_selector: string | null
	native_currency_decimals: number
	native_currency_name: string
	native_currency_symbol: string
	explorer: string | null
	rpcs: string[]
}

export type ChainDeployment = {
	chain_id: number
	type: DeploymentType
	address: string
}

export type ChainConfigurationItem = {
	chain: Chain
	deployments: ChainDeployment[]
}

export const useLoadChains = () => {
	const { setChains, setLoading } = useChainsStore()

	const fetchChains = async () => {
		const response = await fetchChainConfiguration()
		return response.payload.items
			.map((item: ChainConfigurationItem) => {
				const usdc_e = item.deployments.find(d => d.type === 'usdc_e')?.address
				const bridge_lbf = item.deployments.find(d => d.type === 'bridge_lbf')?.address
				const rpcs = Array.isArray(item.chain.rpcs) ? item.chain.rpcs.filter(Boolean) : []
				if (!usdc_e || !bridge_lbf || rpcs.length === 0) return null
				return {
					id: Number(item.chain.id),
					name: item.chain.name,
					selector: item.chain.concero_selector ? BigInt(item.chain.concero_selector) : 0n,
					logo: 'https://api.v2.concero.io/static/chains/' + item.chain.id + '.svg',
					nativeCurrency: {
						name: item.chain.native_currency_name,
						symbol: item.chain.native_currency_symbol,
						decimals: item.chain.native_currency_decimals,
					},
					rpcUrls: { default: { http: rpcs } },
					explorer: item.chain.explorer,
					testnet: item.chain.is_testnet,
					contracts: { usdc_e, bridge_lbf },
				}
			})
			.filter(Boolean)
	}

	const {
		data: chains,
		isLoading: chainsLoading,
		refetch: refetchChains,
	} = useQuery({
		queryKey: ['chainsConfig'],
		queryFn: fetchChains,
		staleTime: 30_000,
		retry: 2,
		refetchOnWindowFocus: false,
	})

	useEffect(() => {
		setChains(chains || [])
		setLoading(chainsLoading)
	}, [chains, chainsLoading, setChains, setLoading])

	return { chains: chains || [], loading: chainsLoading, refetchChains }
}
