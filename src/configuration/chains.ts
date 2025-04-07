import type { AppKitNetwork } from '@reown/appkit/networks'
import { http, fallback } from 'viem'
import { defineChain } from 'viem'
import {
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
	megaethTestnet,
	modeTestnet,
	monadTestnet,
	optimismSepolia,
	polygonAmoy,
	saigon,
	scrollSepolia,
	seiTestnet,
	sepolia,
	shibariumTestnet,
	soneiumMinato,
	sonicBlazeTestnet,
	unichainSepolia,
	xLayerTestnet,
	zircuitTestnet,
} from '@reown/appkit/networks'


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
	//// APECHAIN CURTIS ////
	curtis,

	//// ARBITRUM SEPOLIA ////
	arbitrumSepolia,

	//// AVALANCHE FUJI ////
	avalancheFuji,

	//// BASE SEPOLIA ////
	baseSepolia,

	//// BITLAYER TESTNET ////
	bitlayerTestnet,

	//// BLAST SEPOLIA ////
	blastSepolia,

	//// BNB TESTNET ////
	bscTestnet,

	//// BOTANIX TESTNET ////
	botanixTestnet,

	//// CELO ALFAJORES ////
	celoAlfajores,

	//// CORE TESTNET ////
	coreTestnet,

	//// CRONOS TESTNET ////
	cronosTestnet,

	//// GNOSIS CHIADO ////
	gnosisChiado,

	//// HASHKEY TESTNET ////
	hashkeyTestnet,

	//// INK SEPOLIA ////
	inkSepolia,

	//// LINEA SEPOLIA ////
	lineaSepolia,

	//// MANTLE SEPOLIA ////
	mantleSepoliaTestnet,

	//// MEGAETH TESTNET ////
	megaethTestnet,

	//// MODE TESTNET ////
	modeTestnet,

	//// MONAD TESTNET ////
	monadTestnet,

	//// OPTIMISM SEPOLIA ////
	optimismSepolia,

	//// POLYGON AMOY ////
	polygonAmoy,

	//// SAIGON ////
	saigon,

	//// SCROLL SEPOLIA ////
	scrollSepolia,

	//// SEI TESTNET ////
	seiTestnet,

	//// SEPOLIA ////
	sepolia,

	//// SHIBARIUM TESTNET ////
	shibariumTestnet,

	//// SONEIUM MINATO ////
	soneiumMinato,

	//// SONIC BLAZE TESTNET ////
	sonicBlazeTestnet,

	//// UNICHAIN SEPOLIA ////
	unichainSepolia,

	//// XLAYER SEPOLIA ////
	xLayerTestnet,

	//// ZIRCUT TESTNET ////
	zircuitTestnet,
]

export const transports = {
	//// APECHAIN CURTIS ////
	[curtis.id]: fallback([http('https://apechain-curtis.drpc.org'), http('https://rpc.curtis.apechain.com'), http()]),

	//// ARBITRUM SEPOLIA ////
	[arbitrumSepolia.id]: fallback([
		http('https://arbitrum-sepolia.gateway.tenderly.co'),
		http('https://arbitrum-sepolia.drpc.org'),
		http(),
	]),

	//// AVALANCHE FUJI ////
	[avalancheFuji.id]: fallback([
		http('https://avalanche-fuji.drpc.org'),
		http('https://avalanche-fuji-c-chain-rpc.publicnode.com'),
		http('https://endpoints.omniatech.io/v1/avax/fuji/public'),
		http(),
	]),
	
	//// BASE SEPOLIA ////
	[baseSepolia.id]: fallback([
		http('https://base-sepolia.gateway.tenderly.co'),
		http('https://base-sepolia.drpc.org'),
		http('https://base-sepolia-rpc.publicnode.com'),
		http(),
	]),

	//// BITLAYER TESTNET ////
	[bitlayerTestnet.id]: fallback([
		http('https://testnet-rpc.bitlayer.org'),
		http('https://rpc.ankr.com/bitlayer_testnet'),
		http(),
	]),

	//// BLAST SEPOLIA ////
	[blastSepolia.id]: fallback([
		http('https://sepolia.blast.io'),
		http('https://endpoints.omniatech.io/v1/blast/sepolia/public'),
		http(),
	]),

	/// BNB TESTNET ///
	[bscTestnet.id]: fallback([
		http('https://bsc-testnet.drpc.org'),
		http('https://endpoints.omniatech.io/v1/bsc/testnet/public'),
		http('https://public.stackup.sh/api/v1/node/bsc-testnet'),
		http(),
	]),

	//// BOTANIX TESTNET ////
	[botanixTestnet.id]: fallback([http('https://node.botanixlabs.dev'), http()]),

	//// CELO ALFAJORES ////
	[celoAlfajores.id]: fallback([
		http('https://celo-alfajores.drpc.org'),
		http('https://alfajores-forno.celo-testnet.org'),
		http(),
	]),

	//// CORE TESTNET ////
	[coreTestnet.id]: fallback([http()]),

	//// CRONOS TESTNET ////
	[cronosTestnet.id]: fallback([
		http('https://evm-t3.cronos.org'),
		http('https://endpoints.omniatech.io/v1/cronos/testnet/public'),
		http(),
	]),

	//// GNOSIS CHIADO ////
	[gnosisChiado.id]: fallback([
		http('https://gnosis-chiado-rpc.publicnode.com'),
		http('https://endpoints.omniatech.io/v1/gnosis/chiado/public'),
		http(),
	]),

	//// HASHKEY TESTNET ////
	[hashkeyTestnet.id]: fallback([http()]),

	//// INK SEPOLIA ////
	[inkSepolia.id]: fallback([http('https://ink-sepolia.drpc.org'), http()]),

	//// LINEA SEPOLIA ////
	[lineaSepolia.id]: fallback([
		http('https://linea-sepolia.drpc.org'),
		http('https://linea-sepolia-rpc.publicnode.com'),
		http(),
	]),

	//// MANTLE SEPOLIA ////
	[mantleSepoliaTestnet.id]: fallback([
		http('https://endpoints.omniatech.io/v1/mantle/sepolia/public'),
		http('https://rpc.sepolia.mantle.xyz'),
		http(),
	]),

	//// MEGAETH TESTNET ////
	[megaethTestnet.id]: fallback([http('https://carrot.megaeth.com/rpc'), http()]),

	//// MODE TESTNET ////
	[modeTestnet.id]: fallback([http('https://sepolia.mode.network'), http()]),

	//// MONAD TESTNET ////
	[monadTestnet.id]: fallback([
		http('https://monad-testnet.drpc.org'),
		http('https://testnet-rpc.monad.xyz'),
		http(),
	]),

	//// OPTIMISM SEPOLIA ////
	[optimismSepolia.id]: fallback([
		http('https://endpoints.omniatech.io/v1/op/sepolia/public'),
		http('https://optimism-sepolia.gateway.tenderly.co'),
		http('https://optimism-sepolia.drpc.org'),
		http(),
	]),

	//// POLYGON AMOY ////
	[polygonAmoy.id]: fallback([
		http('https://api.zan.top/polygon-amoy'),
		http('https://polygon-amoy.gateway.tenderly.co'),
		http('https://rpc-amoy.polygon.technology'),
		http(),
	]),

	//// SAIGON ////
	[saigon.id]: fallback([http()]),

	//// SCROLL SEPOLIA ////
	[scrollSepolia.id]: fallback([
		http('https://sepolia-rpc.scroll.io'),
		http('https://scroll-sepolia.chainstacklabs.com'),
		http('https://scroll-public.scroll-testnet.quiknode.pro'),
		http(),
	]),

	//// SEI TESTNET ////
	[seiTestnet.id]: fallback([http('https://evm-rpc-testnet.sei-apis.com'), http()]),

	//// SEPOLIA ////
	[sepolia.id]: fallback([
		http('https://1rpc.io/sepolia'),
		http('https://ethereum-sepolia-rpc.publicnode.com'),
		http('https://endpoints.omniatech.io/v1/eth/sepolia/public'),
		http(),
	]),

	//// SHIBARIUM TESTNET ////
	[shibariumTestnet.id]: fallback([http('https://puppynet.shibrpc.com'), http()]),

	//// SONEIUM MINATO ////
	[soneiumMinato.id]: fallback([
		http('https://rpc.minato.soneium.org'),
		http('https://soneium-minato.drpc.org'),
		http(),
	]),

	//// SONIC BLAZE TESTNET ////
	[sonicBlazeTestnet.id]: fallback([
		http('https://rpc.blaze.soniclabs.com'),
		http('https://sonic-testnet.drpc.org'),
		http(),
	]),

	//// UNICHAIN SEPOLIA ////
	[unichainSepolia.id]: fallback([
		http('https://sepolia.unichain.org'),
		http('https://unichain-sepolia-rpc.publicnode.com'),
		http('https://unichain-sepolia.drpc.org'),
		http(),
	]),

	//// XLAYER SEPOLIA ////
	[xLayerTestnet.id]: fallback([
		http('https://xlayertestrpc.okx.com'),
		http('https://endpoints.omniatech.io/v1/xlayer/testnet/public'),
		http(),
	]),

	//// ZIRCUT TESTNET ////
	[zircuitTestnet.id]: fallback([
		http('https://testnet.zircuit.com'),
		http('https://zircuit1-testnet.p2pify.com'),
		http(),
	]),
}




