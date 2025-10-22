import { isAddress } from 'viem'
import { defineChain } from 'viem'

const API_BASE_URL = 'http://localhost:3000'
const CHAIN_LOGO_BASE_URL = 'https://api.v2.concero.io/static/chains'

/**
 * Deployment types available in the Concero ecosystem
 * Each type represents a different contract deployment
 */
export enum DeploymentType {
	usdc_e = 'usdc_e',
	usdc = 'usdc',
	bridge_lbf = 'bridge_lbf',
	bridge_v2 = 'bridge_v2',
	message_v2 = 'message_v2',
	orchestrator = 'orchestrator',
	message_v1 = 'message_v1',
}

/**
 * Raw chain data structure from API
 * Represents blockchain network information
 */
export type ApiChain = {
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

/**
 * Contract deployment information for a specific chain
 */
export type ApiChainDeployment = {
	chain_id: number
	type: DeploymentType
	address: string
}

/**
 * Complete chain configuration from API
 * Combines chain metadata with its deployments
 */
export type ChainConfig = {
	chain: ApiChain
	deployments: ApiChainDeployment[]
}

/**
 * Normalized chain format for application use
 * Simplified structure optimized for frontend consumption
 */
export type ConceroChain = {
	id: number
	name: string
	selector: bigint
	logo: string
	nativeCurrency: {
		name: string
		symbol: string
		decimals: number
	}
	rpcUrls: { default: { http: string[] } }
	explorer: string | null
	testnet: boolean
	contracts: {
		usdc_e: string
		bridge_lbf: string
	}
}

/**
 * Fetches chain configuration from the Concero API
 *
 * @param isTestnet - Whether to fetch testnet or mainnet chains
 * @returns Promise resolving to the raw API response with chain configurations
 * @throws Error if the API request fails
 *
 * @example
 * const chains = await fetchChainConfiguration(true)
 */
export const getChains = async (isTestnet = true) => {
	const url = new URL('/api/v1/chains/configuration', API_BASE_URL)
	url.searchParams.set('is_testnet', String(isTestnet))

	const response = await fetch(url.toString())

	if (!response.ok) {
		throw new Error(`[Concero] Failed to fetch chain configuration: ${response.status} ${response.statusText}`)
	}

	return response.json()
}

/**
 * Extracts a deployment address by type from the deployments array
 *
 * @param deployments - Array of chain deployments
 * @param type - The deployment type to find
 * @returns The deployment address if found, undefined otherwise
 */
const findDeploymentAddress = (deployments: ApiChainDeployment[], type: DeploymentType): string | undefined => {
	return deployments.find(d => d.type === type)?.address
}

/**
 * Filters and validates RPC URLs
 * Removes falsy values and ensures only valid URLs are returned
 *
 * @param rpcs - Raw RPC URLs from API
 * @returns Filtered array of valid RPC URLs
 */
const sanitizeRpcUrls = (rpcs: string[]): string[] => {
	return Array.isArray(rpcs) ? rpcs.filter(Boolean) : []
}

/**
 * Transforms raw API chain configuration to normalized ConceroChain format
 *
 * Validates that the chain has:
 * - USDC_E contract deployment
 * - Bridge LBF contract deployment
 * - At least one valid RPC URL
 *
 * @param config - Raw chain configuration from API
 * @returns Normalized ConceroChain object or null if validation fails
 *
 * @example
 * const chain = transformToApplicationChain(rawConfig)
 * if (chain) {
 *   // Use the normalized chain
 * }
 */
export const toConceroChain = (config: ChainConfig): ConceroChain | null => {
	const usdcAddress = findDeploymentAddress(config.deployments, DeploymentType.usdc_e)
	const bridgeAddress = findDeploymentAddress(config.deployments, DeploymentType.bridge_lbf)
	const validRpcs = sanitizeRpcUrls(config.chain.rpcs)

	if (!usdcAddress || !bridgeAddress || validRpcs.length === 0) return null
	if (!isAddress(usdcAddress) || !isAddress(bridgeAddress)) return null

	return {
		id: Number(config.chain.id),
		name: config.chain.name,
		selector: config.chain.concero_selector ? BigInt(config.chain.concero_selector) : 0n,
		logo: `${CHAIN_LOGO_BASE_URL}/${config.chain.id}.svg`,
		nativeCurrency: {
			name: config.chain.native_currency_name,
			symbol: config.chain.native_currency_symbol,
			decimals: config.chain.native_currency_decimals,
		},
		rpcUrls: {
			default: { http: validRpcs },
		},
		explorer: config.chain.explorer,
		testnet: config.chain.is_testnet,
		contracts: {
			usdc_e: usdcAddress,
			bridge_lbf: bridgeAddress,
		},
	}
}

/**
 * Transforms an array of raw chain configurations to normalized format
 * Filters out any chains that fail validation during transformation
 *
 * @param configs - Array of raw chain configurations from API
 * @returns Array of valid ConceroChain objects
 *
 * @example
 * const normalizedChains = transformToApplicationChains(apiResponse.payload.items)
 */
export const toConceroChains = (configs: ChainConfig[]): ConceroChain[] => {
	return configs.reduce<ConceroChain[]>((validChains, config) => {
		const chain = toConceroChain(config)
		if (chain) {
			validChains.push(chain)
		}
		return validChains
	}, [])
}

/**
 * Converts ConceroChain to viem-compatible Chain format
 * Used for integration with wagmi/viem libraries
 *
 * @param chain - Normalized ConceroChain object
 * @returns Viem-compatible chain configuration
 *
 * @example
 * const viemChain = convertToViemChain(conceroChain)
 * const client = createPublicClient({ chain: viemChain })
 */
export const convertToViemChain = (chain: ConceroChain) => {
	return {
		id: chain.id,
		name: chain.name,
		nativeCurrency: {
			name: chain.nativeCurrency.name,
			symbol: chain.nativeCurrency.symbol,
			decimals: chain.nativeCurrency.decimals,
		},
		rpcUrls: {
			default: {
				http: chain.rpcUrls.default.http.filter(Boolean),
			},
		},
		blockExplorers: chain.explorer
			? {
					default: {
						name: `${chain.name} Explorer`,
						url: chain.explorer,
					},
				}
			: undefined,
		testnet: chain.testnet,
	}
}

/**
 * Converts an array of ConceroChains to viem Chain format
 * Uses viem's defineChain for proper type safety and validation
 *
 * @param chains - Array of normalized ConceroChain objects
 * @returns Array of viem-compatible Chain objects
 *
 * @example
 * const viemChains = convertToViemChains(conceroChains)
 * const wagmiConfig = createConfig({ chains: viemChains })
 */

export const convertToViemChains = (chains: ConceroChain[]): ReturnType<typeof defineChain>[] => {
	return chains.map(chain =>
		defineChain({
			id: chain.id,
			name: chain.name,
			nativeCurrency: {
				name: chain.nativeCurrency.name,
				symbol: chain.nativeCurrency.symbol,
				decimals: chain.nativeCurrency.decimals,
			},
			rpcUrls: {
				default: {
					http: chain.rpcUrls.default.http.filter(Boolean),
				},
			},
			testnet: chain.testnet,
		}),
	)
}
