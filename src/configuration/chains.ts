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
	celoAlfajores,
	cronosTestnet,
	gnosisChiado,
	lineaSepolia,
	monadTestnet,
	optimismSepolia,
	polygonAmoy,
	scrollSepolia,
	seiTestnet,
	sepolia,
	soneiumMinato,
	unichainSepolia,
	berachainBepolia,
	opBNBTestnet,
	auroraTestnet,
	bobSepolia,
	flowTestnet,
	metisSepolia,
	kavaTestnet,
	sonicBlazeTestnet,
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
	curtis, // INCLUDED

	//// ARBITRUM SEPOLIA ////
	arbitrumSepolia, // INCLUDED

	//// AVALANCHE FUJI //// 
	avalancheFuji, // INCLUDED

	//// BASE SEPOLIA ////
	baseSepolia, // INCLUDED

	//// BITLAYER TESTNET ////
	bitlayerTestnet, // INCLUDED

	//// BLAST SEPOLIA ////
	blastSepolia, // INCLUDED

	//// BNB TESTNET ////
	bscTestnet, // INCLUDED

	//// CELO ALFAJORES ////
	celoAlfajores, // INCLUDED

	//// CORE TESTNET ////
	coreTestnet, // INCLUDED

	//// CRONOS TESTNET ////
	cronosTestnet, // INCLUDED

	//// GNOSIS CHIADO ////
	gnosisChiado, // INCLUDED

	//// LINEA SEPOLIA ////
	lineaSepolia, // INCLUDED

	//// MONAD TESTNET ////
	monadTestnet, // INCLUDED

	//// OPTIMISM SEPOLIA ////
	optimismSepolia, // INCLUDED

	//// POLYGON AMOY ////
	polygonAmoy, // INCLUDED

	//// SCROLL SEPOLIA ////
	scrollSepolia, // INCLUDED

	//// SEI TESTNET ////
	seiTestnet, // INCLUDED

	//// SEPOLIA ////
	sepolia, // INCLUDED

	//// SONEIUM MINATO ////
	soneiumMinato, // INCLUDED

	//// UNICHAIN SEPOLIA ////
	unichainSepolia, // INCLUDED

	//// BERACHAIN BEPOLIA ////
	berachainBepolia, // INCLUDED

	//// OP BNB TESTNET ////
	opBNBTestnet, // INCLUDED

	//// AURORA TESTNET ////
	auroraTestnet, // INCLUDED

	//// BOB SEPOLIA ////
	bobSepolia, // INCLUDED

	//// FLOW TESTNET ////
	flowTestnet, // INCLUDED

	//// METIS SEPOLIA ////
	metisSepolia, // INCLUDED

	//// KAVA TESTNET ////
	kavaTestnet, //INCLUDED

	//// WEMIX TESTNET ////
	wemixTestnet, //INCLUDED

	//// IRYS TESTNET ////
	irysTestnet, // INCLUDED

	//// MANTA PACIFIC SEPOLIA ////
	mantaPacificSepoliaTestnet, // INCLUDED

	//// SONIC BLAZE TESTNET ////
	sonicBlazeTestnet, // INCLUDED
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

    //// BNB TESTNET ////
    [bscTestnet.id]: createTransport([
        'https://bsc-testnet.public.blastapi.io',
        'https://bsc-testnet-rpc.publicnode.com',
        'https://bnb-testnet.api.onfinality.io/public',
        'https://bsc-testnet.drpc.org',
    ]),

    //// CELO ALFAJORES ////
    [celoAlfajores.id]: createTransport([
        'https://alfajores-forno.celo-testnet.org',
        'https://alfajores-forno.celo-testnet.org',
        'https://celo-alfajores.drpc.org',
    ]),

    //// CORE TESTNET ////
    [coreTestnet.id]: createTransport([
        'https://rpc.test2.btcs.network',
        'https://rpc.test2.btcs.network',
    ]),

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

    //// LINEA SEPOLIA ////
    [lineaSepolia.id]: createTransport([
        'https://linea-sepolia-rpc.publicnode.com',
        'https://rpc.sepolia.linea.build',
        'https://linea-sepolia.drpc.org',
    ]),

    //// MONAD TESTNET ////
    [monadTestnet.id]: createTransport([
        'https://testnet-rpc.monad.xyz',
        'https://monad-testnet.drpc.org',
    ]),

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
    [flowTestnet.id]: createTransport([
        'https://testnet.evm.nodes.onflow.org',
        'https://testnet.evm.nodes.onflow.org',
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

    //// WEMIX TESTNET ////
    [wemixTestnet.id]: createTransport([
        'https://api.test.wemix.com',
        'https://wemix-testnet.drpc.org',
    ]),

    //// IRYS TESTNET ////
    [irysTestnet.id]: createTransport([
        'https://testnet-rpc.irys.xyz/v1/execution-rpc',
        'https://testnet-rpc.irys.xyz/v1/execution-rpc',
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
}

