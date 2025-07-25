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
	// mantleSepoliaTestnet,
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
	unichainSepolia,
	xLayerTestnet,
	zircuitTestnet,
	berachainBepolia,
	opBNBTestnet,
	auroraTestnet,
	bobSepolia,
	flowTestnet,
	fraxtalTestnet,
	metisSepolia,
	kavaTestnet,
	morphHolesky,
	abstractTestnet,
	// oasisTestnet,
	sonicBlazeTestnet,
	seismicDevnet,
} from '@reown/appkit/networks'

const httpOptions = {
	onFetchResponse(response: Response) {
		if (!response.ok) {
			console.log(`HTTP Error: ${response.status} - ${response.statusText}`)
		}
	},
	batch: true,
}

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

const wemixTestnet = defineChain({
	id: 1112,
	name: 'WEMIX_Testnet',
	nativeCurrency: {
		decimals: 18,
		name: 'tWEMIX',
		symbol: 'tWEMIX',
	},
	rpcUrls: {
		default: {
			http: ['https://api.test.wemix.com'],
		},
	},
	blockExplorers: {
		default: { name: 'WEMIX Explorer', url: 'https://explorer.test.wemix.com/' },
	},
	testnet: true,
})

const irysTestnet = defineChain({
	id: 1270,
	name: 'Irys Testnet',
	nativeCurrency: {
		decimals: 18,
		name: 'mIRYS',
		symbol: 'IRYS',
	},
	rpcUrls: {
		default: {
			http: ['https://testnet-rpc.irys.xyz/v1/execution-rpc'],
		},
	},
	blockExplorers: {
		default: { name: 'Irys Explorer', url: 'https://testnet-explorer.irys.xyz' },
	},
	testnet: true,
})

const expchainTestnet = defineChain({
	id: 18880,
	name: 'EXPchain Testnet',
	nativeCurrency: {
		decimals: 18,
		name: 'tZKJ',
		symbol: 'tZKJ',
	},
	rpcUrls: {
		default: {
			http: ['https://expchain.polyhedra.network/rpc0-testnet'],
		},
	},
	blockExplorers: {
		default: { name: 'EXPchain Explorer', url: 'https://expchain.polyhedra.network/blockscout-testnet' },
	},
	testnet: true,
})

const b2Testnet = defineChain({
	id: 1123,
	name: 'B2 Testnet',
	nativeCurrency: {
		decimals: 18,
		name: 'BTC',
		symbol: 'BTC',
	},
	rpcUrls: {
		default: {
			http: [
				'https://b2-testnet.alt.technology',
				'https://rpc.ankr.com/b2_testnet',
				'https://testnet-rpc.bsquared.network',
			],
		},
	},
	blockExplorers: {
		default: { name: 'B2 Testnet Explorer', url: 'https://explorer.bsquared.network' },
	},
	testnet: true,
})

// const xoMarketTestnet = defineChain({
// 	id: 1000101,
// 	name: 'XO Market Testnet',
// 	nativeCurrency: {
// 		decimals: 18,
// 		name: 'ETH',
// 		symbol: 'ETH',
// 	},
// 	rpcUrls: {
// 		default: {
// 			http: ['https://dev-testnet-rpc.xo.market'],
// 		},
// 	},
// 	testnet: true,
// })

// const taikoHekla = defineChain({
// 	id: 167009,
// 	name: 'Taiko Hekla Testnet',
// 	nativeCurrency: {
// 		decimals: 18,
// 		name: 'Ether',
// 		symbol: 'ETH',
// 	},
// 	rpcUrls: {
// 		default: {
// 			http: ['https://rpc.hekla.taiko.xyz'],
// 		},
// 	},
// 	blockExplorers: {
// 		default: {
// 			name: 'Taikoscan',
// 			url: 'https://hekla.taikoscan.io',
// 		},
// 	},
// 	testnet: true,
// })

const pulsechainTestnet = defineChain({
	id: 943,
	name: 'PulseChain Testnet',
	nativeCurrency: {
		decimals: 18,
		name: 'tPLS',
		symbol: 'tPLS',
	},
	rpcUrls: {
		default: {
			http: [
				'https://rpc-testnet-pulsechain.g4mm4.io',
				'https://pulsechain-testnet.publicnode.com',
				'https://rpc.v4.testnet.pulsechain.com',
			],
		},
	},
	blockExplorers: {
		default: { name: 'PulseChain Explorer', url: 'https://scan.v2.testnet.pulsechain.com/' },
	},
	testnet: true,
})

const kaiaKairos = defineChain({
	id: 1001,
	name: 'Kaia Kairos Testnet',
	nativeCurrency: {
		decimals: 18,
		name: 'KAIA',
		symbol: 'KAIA',
	},
	rpcUrls: {
		default: {
			http: [
				'https://public-en-kairos.node.kaia.io',
				'https://kaia-kairos.blockpi.network/v1/rpc/public',
				'https://responsive-green-emerald.kaia-kairos.quiknode.pro/',
			],
		},
	},
	blockExplorers: {
		default: { name: 'Kairos Scope', url: 'https://kairos.kaiascope.com' },
	},
	testnet: true,
})

const mantaPacificSepoliaTestnet = defineChain({
	id: 3441006,
	name: 'Manta Pacific Sepolia Testnet',
	nativeCurrency: {
		decimals: 18,
		name: 'Ether',
		symbol: 'ETH',
	},
	rpcUrls: {
		default: {
			http: ['https://pacific-rpc.sepolia-testnet.manta.network/http'],
			webSocket: ['wss://pacific-rpc.sepolia-testnet.manta.network/ws'],
		},
	},
	blockExplorers: {
		default: {
			name: 'Manta Pacific Sepolia Explorer',
			url: 'https://pacific-explorer.sepolia-testnet.manta.network',
		},
	},
	testnet: true,
})

export const astarShibuya = defineChain({
	id: 81,
	name: 'Astar Shibuya Testnet',
	network: 'shibuya',
	nativeCurrency: {
		decimals: 18,
		name: 'Shibuya Token',
		symbol: 'SBY',
	},
	rpcUrls: {
		default: {
			http: ['https://evm.shibuya.astar.network'],
		},
	},
	blockExplorers: {
		default: {
			name: 'Blockscout',
			url: 'https://blockscout.com/shibuya',
		},
	},
})

const fallbackOptions = {
	retryCount: 1,
	retryDelay: 2500,
	timeout: 1000,
}

const createTransport = (urls: string[]) => {
  return fallback(
    urls.map(url => http(url, httpOptions)),
    {
      ...fallbackOptions,
    }
  )
}


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
	// mantleSepoliaTestnet,

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

	//// UNICHAIN SEPOLIA ////
	unichainSepolia,

	//// XLAYER SEPOLIA ////
	xLayerTestnet,

	//// ZIRCUT TESTNET ////
	zircuitTestnet,

	//// BERACHAIN BEPOLIA ////
	berachainBepolia,

	//// OP BNB TESTNET ////
	opBNBTestnet,

	//// AURORA TESTNET ////
	auroraTestnet,

	//// BOB SEPOLIA ////
	bobSepolia,

	//// FLOW TESTNET ////
	flowTestnet,

	//// FRAXTAL TESTNET ////
	fraxtalTestnet,

	//// METIS SEPOLIA ////
	metisSepolia,

	//// KAVA TESTNET ////
	kavaTestnet,

	//// MORPH HOLESKY ////
	morphHolesky,

	//// ABSTRACT SEPOLIA ////
	abstractTestnet,

	//// OASIS SAPPHIRE ////
	// oasisTestnet,

	//// WEMIX TESTNET ////
	wemixTestnet,

	//// IRYS TESTNET ////
	irysTestnet,

	//// EXPCHAIN TESTNET ////
	expchainTestnet,

	//// B2 TESTNET ////
	b2Testnet,

	//// TAIKO HEKLA ////
	// taikoHekla,

	//// PULSECHAIN TESTNET ////
	pulsechainTestnet,

	//// KAIA KAIROS ////
	kaiaKairos,

	//// MANTA PACIFIC SEPOLIA ////
	mantaPacificSepoliaTestnet,

	//// SONIC BLAZE TESTNET ////
	sonicBlazeTestnet,

	//// SEISMIC DEVNET ////
	seismicDevnet,

	//// ASTAR SHIBUYA ////
	astarShibuya,

	//// XO MARKET TESTNET ////
	// xoMarketTestnet,
]

export const transports = {
	//// APECHAIN CURTIS ////
	[curtis.id]: createTransport([
		'https://rpc.curtis.apechain.com',
		'https://apechain-curtis.drpc.org',
		'https://rpc.curtis.apechain.com',
	]),

	//// ARBITRUM SEPOLIA ////
	[arbitrumSepolia.id]: createTransport([
		'https://endpoints.omniatech.io/v1/arbitrum/sepolia/public',
		'https://arbitrum-sepolia.gateway.tenderly.co',
		'https://sepolia-rollup.arbitrum.io/rpc',
		'https://arbitrum-sepolia.drpc.org',
	]),

	//// AVALANCHE FUJI ////
	[avalancheFuji.id]: createTransport([
		'https://ava-testnet.public.blastapi.io/ext/bc/C/rpc',
		'https://avalanche-fuji-c-chain-rpc.publicnode.com',
		'https://api.avax-test.network/ext/bc/C/rpc',
		'https://avalanche-fuji.drpc.org',
	]),

	//// BASE SEPOLIA ////
	[baseSepolia.id]: createTransport([
		'https://base-sepolia.gateway.tenderly.co',
		'https://base-sepolia-rpc.publicnode.com',
		'https://sepolia.base.org',
		'https://base-sepolia.drpc.org',
	]),

	//// BITLAYER TESTNET ////
	[bitlayerTestnet.id]: createTransport([
		'https://testnet-rpc.bitlayer.org',
		'https://rpc.ankr.com/bitlayer_testnet',
		'https://testnet-rpc.bitlayer.org',
	]),

	//// BLAST SEPOLIA ////
	[blastSepolia.id]: createTransport([
		'https://sepolia.blast.io',
		'https://endpoints.omniatech.io/v1/blast/sepolia/public',
		'https://sepolia.blast.io',
	]),

	/// BNB TESTNET ///
	[bscTestnet.id]: createTransport([
		'https://bsc-testnet.public.blastapi.io',
		'https://bsc-testnet-rpc.publicnode.com',
		'https://bnb-testnet.api.onfinality.io/public',
		'https://bsc-testnet.drpc.org',
	]),

	//// BOTANIX TESTNET ////
	[botanixTestnet.id]: createTransport(['https://rpc.ankr.com/botanix_testnet', 'https://node.botanixlabs.dev']),

	//// CELO ALFAJORES ////
	[celoAlfajores.id]: createTransport([
		'https://alfajores-forno.celo-testnet.org',
		'https://alfajores-forno.celo-testnet.org',
		'https://celo-alfajores.drpc.org',
	]),

	//// CORE TESTNET ////
	[coreTestnet.id]: createTransport(['https://rpc.test2.btcs.network', 'https://rpc.test2.btcs.network']),

	//// CRONOS TESTNET ////
	[cronosTestnet.id]: createTransport([
		'https://evm-t3.cronos.org',
		'https://endpoints.omniatech.io/v1/cronos/testnet/public',
		'https://evm-t3.cronos.org',
	]),

	//// GNOSIS CHIADO ////
	[gnosisChiado.id]: createTransport([
		'https://gnosis-chiado-rpc.publicnode.com',
		'https://endpoints.omniatech.io/v1/gnosis/chiado/public',
		'https://rpc.chiadochain.net',
	]),

	//// HASHKEY TESTNET ////
	[hashkeyTestnet.id]: createTransport([
		'https://hashkeychain-testnet.alt.technology',
		'https://hashkey-testnet.drpc.org',

	]),

	//// INK SEPOLIA ////
	[inkSepolia.id]: createTransport(['https://rpc-gel-sepolia.inkonchain.com', 'https://ink-sepolia.drpc.org']),

	//// LINEA SEPOLIA ////
	[lineaSepolia.id]: createTransport([
		'https://linea-sepolia-rpc.publicnode.com',
		'https://rpc.sepolia.linea.build',
		'https://linea-sepolia.drpc.org',
	]),

	//// MANTLE SEPOLIA ////
	// [mantleSepoliaTestnet.id]: fallback([
	// 	http('https://endpoints.omniatech.io/v1/mantle/sepolia/public'),
	// 	http('https://rpc.sepolia.mantle.xyz'),
	// 	http(),
	// ]),

	//// MEGAETH TESTNET ////
	[megaethTestnet.id]: createTransport(['https://carrot.megaeth.com/rpc', 'https://carrot.megaeth.com/rpc']),

	//// MODE TESTNET ////
	[modeTestnet.id]: createTransport([
		'https://sepolia.mode.network',
		'https://mode-testnet.drpc.org',
		'https://sepolia.mode.network',
	]),

	//// MONAD TESTNET ////
	[monadTestnet.id]: createTransport(['https://testnet-rpc.monad.xyz', 'https://monad-testnet.drpc.org']),

	//// OPTIMISM SEPOLIA ////
	[optimismSepolia.id]: createTransport([
		'https://endpoints.omniatech.io/v1/op/sepolia/public',
		'https://optimism-sepolia.gateway.tenderly.co',
		'https://sepolia.optimism.io',
		'https://optimism-sepolia.drpc.org',
	]),

	//// POLYGON AMOY ////
	[polygonAmoy.id]: createTransport([
		'https://polygon-amoy-bor-rpc.publicnode.com',
		'https://polygon-amoy.gateway.tenderly.co',
		'https://rpc-amoy.polygon.technology',
	]),

	//// SAIGON ////
	[saigon.id]: createTransport(['https://saigon-testnet.roninchain.com/rpc']),

	//// SCROLL SEPOLIA ////
	[scrollSepolia.id]: createTransport([
		'https://sepolia-rpc.scroll.io',
		'https://scroll-sepolia.chainstacklabs.com',
		'https://scroll-public.scroll-testnet.quiknode.pro',
		'https://sepolia-rpc.scroll.io',
	]),

	//// SEI TESTNET ////
	[seiTestnet.id]: createTransport([
		'https://evm-rpc-testnet.sei-apis.com',
		'https://sei-testnet.drpc.org',
		'https://evm-rpc-testnet.sei-apis.com',
	]),

	//// SEPOLIA ////
	[sepolia.id]: createTransport([
		'https://ethereum-sepolia-rpc.publicnode.com',
		'https://endpoints.omniatech.io/v1/eth/sepolia/public',
		'https://1rpc.io/sepolia',
		'https://sepolia.drpc.org',
	]),

	//// SHIBARIUM TESTNET ////
	[shibariumTestnet.id]: createTransport(['https://puppynet.shibrpc.com', 'https://puppynet.shibrpc.com']),

	//// SONEIUM MINATO ////
	[soneiumMinato.id]: createTransport([
		'https://rpc.minato.soneium.org',
		'https://soneium-minato.drpc.org',
		'https://rpc.minato.soneium.org',
	]),

	//// UNICHAIN SEPOLIA ////
	[unichainSepolia.id]: createTransport([
		'https://unichain-sepolia-rpc.publicnode.com',
		'https://sepolia.unichain.org',
		'https://unichain-sepolia.drpc.org',
	]),

	//// XLAYER SEPOLIA ////
	[xLayerTestnet.id]: createTransport([
		'https://rpc.ankr.com/xlayer_testnet',
		'https://endpoints.omniatech.io/v1/xlayer/testnet/public',
		'https://xlayertestrpc.okx.com',
	]),

	//// ZIRCUIT TESTNET ////
	[zircuitTestnet.id]: createTransport([
		'https://testnet.zircuit.com',
		'https://zircuit-testnet.drpc.org',
		'https://zircuit1-testnet.liquify.com',
	]),

	//// BERACHAIN BEPOLIA ////
	[berachainBepolia.id]: createTransport([
		'https://bepolia.rpc.berachain.com',
		'https://berachain-bepolia.drpc.org',
		'https://bepolia.rpc.berachain.com',
	]),

	//// OP BNB TESTNET ////
	[opBNBTestnet.id]: createTransport([
		'https://opbnb-testnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3',
		'https://opbnb-testnet.nodereal.io/v1/e9a36765eb8a40b9bd12e680a1fd2bc5',
		'https://opbnb-testnet-rpc.bnbchain.org',
	]),

	//// AURORA TESTNET ////
	[auroraTestnet.id]: createTransport([
		'https://testnet.aurora.dev',
		'https://aurora-testnet.drpc.org',
		'https://testnet.aurora.dev',
	]),

	//// BOB SEPOLIA ////
	[bobSepolia.id]: createTransport([
		'https://bob-sepolia.rpc.gobob.xyz',
		'https://bob-testnet.drpc.org',
		'https://bob-sepolia.rpc.gobob.xyz',
	]),

	//// FLOW TESTNET ////
	[flowTestnet.id]: createTransport(['https://testnet.evm.nodes.onflow.org', 'https://testnet.evm.nodes.onflow.org']),

	//// FRAXTAL TESTNET ////
	[fraxtalTestnet.id]: createTransport([
		'https://fraxtal-holesky-rpc.publicnode.com',
		'https://rpc.testnet.frax.com',
		'https://rpc.testnet.frax.com',
	]),

	//// METIS SEPOLIA ////
	[metisSepolia.id]: createTransport([
		'https://metis-sepolia.gateway.tenderly.co',
		'https://metis-sepolia-rpc.publicnode.com',
		'https://sepolia.metisdevops.link',
	]),

	//// KAVA TESTNET ////
	[kavaTestnet.id]: createTransport([
		'https://evm.testnet.kava.io',
		'https://kava-testnet.drpc.org',
		'https://evm.testnet.kava.io',
	]),

	//// MORPH HOLESKY ////
	[morphHolesky.id]: createTransport([
		'https://rpc-holesky.morphl2.io',
		'https://rpc-quicknode-holesky.morphl2.io',
		'https://rpc-quicknode-holesky.morphl2.io',
	]),

	//// ABSTRACT SEPOLIA ////
	[abstractTestnet.id]: createTransport(['https://api.testnet.abs.xyz', 'https://api.testnet.abs.xyz']),

	//// OASIS SAPPHIRE ////
	// [oasisTestnet.id]: createTransport([
	//     'http'
	// ]),

	//// WEMIX TESTNET ////
	[wemixTestnet.id]: createTransport(['https://api.test.wemix.com', 'https://wemix-testnet.drpc.org']),

	//// IRYS TESTNET ////
	[irysTestnet.id]: createTransport([
		'https://testnet-rpc.irys.xyz/v1/execution-rpc',
		'https://testnet-rpc.irys.xyz/v1/execution-rpc',
	]),

	//// EXPCHAIN TESTNET ////
	[expchainTestnet.id]: createTransport(['https://rpc1-testnet.expchain.ai', 'https://rpc1-testnet.expchain.ai']),

	//// B2 TESTNET ////
	[b2Testnet.id]: createTransport([
		'https://b2-testnet.alt.technology',
		'https://rpc.ankr.com/b2_testnet',
		'https://testnet-rpc.bsquared.network',
	]),

	//// TAIKO HEKLA ////
	// [taikoHekla.id]: createTransport([
	//     'https://rpc.ankr.com/taiko_hekla',
	//     'https://taiko-hekla.gateway.tenderly.co',
	//     'https://rpc.hekla.taiko.xyz',
	//     'http'
	// ]),

	//// PULSECHAIN TESTNET ////
	[pulsechainTestnet.id]: createTransport([
		'https://pulsechain-testnet-v4.rpc.thirdweb.com/',
		'https://pulsechain-testnet.publicnode.com',
		'https://rpc.v2.testnet.pulsechain.com/',
	]),

	//// KAIA KAIROS ////
	[kaiaKairos.id]: createTransport([
		'https://public-en-kairos.node.kaia.io',
		'https://kaia-kairos.blockpi.network/v1/rpc/public',
		'https://responsive-green-emerald.kaia-kairos.quiknode.pro/',
	]),

	//// MANTA PACIFIC SEPOLIA ////
	[mantaPacificSepoliaTestnet.id]: createTransport([
		'https://pacific-rpc.sepolia-testnet.manta.network/http',
		'https://endpoints.omniatech.io/v1/manta-pacific/sepolia/public',
		'https://pacific-rpc.sepolia-testnet.manta.network/http',
	]),

	//// SONIC BLAZE TESTNET ////
	[sonicBlazeTestnet.id]: createTransport([
		'https://rpc.blaze.soniclabs.com',
		'https://sonic-blaze-rpc.publicnode.com',
		'https://rpc.blaze.soniclabs.com',
	]),

	//// SEISMIC DEVNET ////
	[seismicDevnet.id]: createTransport(['https://node-2.seismicdev.net/rpc']),

	//// ASTAR SHIBUYA ////
	[astarShibuya.id]: createTransport(['https://shibuya-rpc.dwellir.com', 'https://evm.shibuya.astar.network']),

	//// XO MARKET TESTNET ////
	// [xoMarketTestnet.id]: createTransport(['https://dev-testnet-rpc.xo.market', 'https://dev-testnet-rpc.xo.market']),
}
