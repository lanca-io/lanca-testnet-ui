import type { AppKitNetwork } from '@reown/appkit/networks'
import { http, fallback } from 'viem'
import { sepolia, arbitrumSepolia, baseSepolia, optimismSepolia, polygonAmoy } from '@reown/appkit/networks'

export const chains: [AppKitNetwork, ...AppKitNetwork[]] = [
	sepolia,
	arbitrumSepolia,
	baseSepolia,
	optimismSepolia,
	polygonAmoy,
]

export const transports = {
	[sepolia.id]: fallback([
		http('https://1rpc.io/sepolia'),
		http('https://ethereum-sepolia-rpc.publicnode.com'),
		http('https://endpoints.omniatech.io/v1/eth/sepolia/public'),
		http(),
	]),
	[arbitrumSepolia.id]: fallback([
		http('https://arbitrum-sepolia.gateway.tenderly.co'),
		http('https://arbitrum-sepolia.drpc.org'),
		http('https://endpoints.omniatech.io/v1/arbitrum/sepolia/public'),
		http(),
	]),
	[baseSepolia.id]: fallback([
		http('https://base-sepolia.gateway.tenderly.co'),
		http('https://base-sepolia.drpc.org'),
		http('https://base-sepolia-rpc.publicnode.com'),
		http(),
	]),
	[optimismSepolia.id]: fallback([
		http('https://endpoints.omniatech.io/v1/op/sepolia/public'),
		http('https://optimism-sepolia.gateway.tenderly.co'),
		http('https://optimism-sepolia.drpc.org'),
		http(),
	]),
	[polygonAmoy.id]: fallback([
		http('https://api.zan.top/polygon-amoy'),
		http('https://polygon-amoy.gateway.tenderly.co'),
		http('https://rpc-amoy.polygon.technology'),
		http(),
	]),
}
