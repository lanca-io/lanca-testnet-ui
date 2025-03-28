import type { AppKitNetwork } from '@reown/appkit/networks'
import { http, fallback } from 'viem'
import { defineChain } from 'viem'
import {
	sepolia,
	arbitrumSepolia,
	baseSepolia,
	optimismSepolia,
	polygonAmoy,
	curtis,
	avalancheFuji,
	bitlayerTestnet,
	blastSepolia,
	botanixTestnet,
	celoAlfajores,
	cronosTestnet,
	gnosisChiado,
	hashkeyTestnet,
	inkSepolia,
	lineaSepolia,
	mantleSepoliaTestnet,
	monadTestnet,
	saigon,
	seiTestnet,
	shibariumTestnet,
	soneiumMinato,
	unichainSepolia,
	xLayerTestnet,
	zircuitTestnet,
	sonicBlazeTestnet,
	modeTestnet,
	bscTestnet,
} from '@reown/appkit/networks'

const shibuya = defineChain({
	id: 81,
	name: 'Shibuya',
	nativeCurrency: {
		decimals: 18,
		name: 'Shibuya',
		symbol: 'SBY',
	},
	rpcUrls: {
		default: {
			http: ['https://evm.shibuya.astar.network'],
		},
	},
	blockExplorers: {
		default: { name: 'Subscan', url: 'https://shibuya.subscan.io' },
	},
	testnet: true,
})

const coreTestnet = defineChain({
	id: 1114,
	name: 'Core Blockchain TestNet',
	nativeCurrency: {
		decimals: 18,
		name: 'CORE',
		symbol: 'tCORE2',
	},
	rpcUrls: {
		default: {
			http: ['https://rpc.test2.btcs.network'],
		},
	},
	blockExplorers: {
		default: { name: 'Core Scan', url: 'https://scan.test2.btcs.network' },
	},
	testnet: true,
})

export const chains: [AppKitNetwork, ...AppKitNetwork[]] = [
	sepolia,
	curtis,
	arbitrumSepolia,
	avalancheFuji,
	baseSepolia,
	bitlayerTestnet,
	blastSepolia,
	bscTestnet,
	botanixTestnet,
	celoAlfajores,
	cronosTestnet,
	gnosisChiado,
	hashkeyTestnet,
	inkSepolia,
	lineaSepolia,
	mantleSepoliaTestnet,
	modeTestnet,
	monadTestnet,
	optimismSepolia,
	polygonAmoy,
	saigon,
	seiTestnet,
	shibariumTestnet,
	soneiumMinato,
	unichainSepolia,
	xLayerTestnet,
	zircuitTestnet,
	sonicBlazeTestnet,
	shibuya,
	coreTestnet,
]

export const transports = {
	[sepolia.id]: fallback([
		http('https://1rpc.io/sepolia'),
		http('https://ethereum-sepolia-rpc.publicnode.com'),
		http('https://endpoints.omniatech.io/v1/eth/sepolia/public'),
		http(),
	]),
	[curtis.id]: fallback([http('https://apechain-curtis.drpc.org'), http('https://rpc.curtis.apechain.com'), http()]),
	[arbitrumSepolia.id]: fallback([
		http('https://arbitrum-sepolia.gateway.tenderly.co'),
		http('https://arbitrum-sepolia.drpc.org'),
		http('https://endpoints.omniatech.io/v1/arbitrum/sepolia/public'),
		http(),
	]),
	[avalancheFuji.id]: fallback([
		http('https://avalanche-fuji.drpc.org'),
		http('https://avalanche-fuji-c-chain-rpc.publicnode.com'),
		http('https://endpoints.omniatech.io/v1/avax/fuji/public'),
		http(),
	]),
	[baseSepolia.id]: fallback([
		http('https://base-sepolia.gateway.tenderly.co'),
		http('https://base-sepolia.drpc.org'),
		http('https://base-sepolia-rpc.publicnode.com'),
		http(),
	]),
	[bitlayerTestnet.id]: fallback([
		http('https://testnet-rpc.bitlayer.org'),
		http('https://rpc.ankr.com/bitlayer_testnet'),
		http(),
	]),
	[blastSepolia.id]: fallback([
		http('https://sepolia.blast.io'),
		http('https://endpoints.omniatech.io/v1/blast/sepolia/public'),
		http(),
	]),
	[bscTestnet.id]: fallback([
		http('https://bsc-testnet.drpc.org'),
		http('https://endpoints.omniatech.io/v1/bsc/testnet/public'),
		http('https://public.stackup.sh/api/v1/node/bsc-testnet'),
		http(),
	]),
	[botanixTestnet.id]: fallback([http('https://node.botanixlabs.dev'), http()]),
	[celoAlfajores.id]: fallback([
		http('https://celo-alfajores.drpc.org'),
		http('https://alfajores-forno.celo-testnet.org'),
		http(),
	]),
	[cronosTestnet.id]: fallback([
		http('https://evm-t3.cronos.org'),
		http('https://endpoints.omniatech.io/v1/cronos/testnet/public'),
		http(),
	]),
	[gnosisChiado.id]: fallback([
		http('https://gnosis-chiado-rpc.publicnode.com'),
		http('https://endpoints.omniatech.io/v1/gnosis/chiado/public'),
		http(),
	]),
	[hashkeyTestnet.id]: fallback([http()]),
	[inkSepolia.id]: fallback([http('https://ink-sepolia.drpc.org'), http()]),
	[lineaSepolia.id]: fallback([
		http('https://linea-sepolia.drpc.org'),
		http('https://linea-sepolia-rpc.publicnode.com'),
		http(),
	]),
	[mantleSepoliaTestnet.id]: fallback([
		http('https://endpoints.omniatech.io/v1/mantle/sepolia/public'),
		http('https://rpc.sepolia.mantle.xyz'),
		http(),
	]),
	[modeTestnet.id]: fallback([http('https://sepolia.mode.network'), http()]),
	[monadTestnet.id]: fallback([
		http('https://monad-testnet.drpc.org'),
		http('https://testnet-rpc.monad.xyz'),
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
	[saigon.id]: fallback([http()]),
	[seiTestnet.id]: fallback([http('https://evm-rpc-testnet.sei-apis.com'), http()]),
	[shibariumTestnet.id]: fallback([http('https://puppynet.shibrpc.com'), http()]),
	[soneiumMinato.id]: fallback([
		http('https://rpc.minato.soneium.org'),
		http('https://soneium-minato.drpc.org'),
		http(),
	]),
	[unichainSepolia.id]: fallback([
		http('https://sepolia.unichain.org'),
		http('https://unichain-sepolia-rpc.publicnode.com'),
		http('https://unichain-sepolia.drpc.org'),
		http(),
	]),
	[xLayerTestnet.id]: fallback([
		http('https://xlayertestrpc.okx.com'),
		http('https://endpoints.omniatech.io/v1/xlayer/testnet/public'),
		http(),
	]),
	[zircuitTestnet.id]: fallback([
		http('https://testnet.zircuit.com'),
		http('https://zircuit1-testnet.p2pify.com'),
		http(),
	]),
	[sonicBlazeTestnet.id]: fallback([
		http('https://rpc.blaze.soniclabs.com'),
		http('https://sonic-testnet.drpc.org'),
		http(),
	]),
	[shibuya.id]: fallback([http()]),
	[coreTestnet.id]: fallback([http()]),
}
