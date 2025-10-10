export type FaucetInfo = {
	chainName: string
	logoUrl: string
	isCCIP: boolean
	faucetName: string
	faucetUrl: string
	searchKeywords?: string[] // Added search keywords field
}

export const faucets: FaucetInfo[] = [
	// SEPOLIA
	{
		chainName: 'Sepolia',
		logoUrl: '/Chains/11155111.svg',
		isCCIP: true,
		faucetName: 'Sepolia 1',
		faucetUrl: 'https://cloud.google.com/application/web3/faucet/ethereum/sepolia',
		searchKeywords: ['ethereum', 'eth'],
	},
	{
		chainName: 'Sepolia',
		logoUrl: '/Chains/11155111.svg',
		isCCIP: true,
		faucetName: 'Sepolia 2',
		faucetUrl: 'https://www.alchemy.com/faucets/ethereum-sepolia',
		searchKeywords: ['ethereum', 'eth'],
	},
	{
		chainName: 'Sepolia',
		logoUrl: '/Chains/11155111.svg',
		isCCIP: true,
		faucetName: 'Sepolia 3',
		faucetUrl: 'https://sepolia-faucet.pk910.de/',
		searchKeywords: ['ethereum', 'eth'],
	},
	{
		chainName: 'Sepolia',
		logoUrl: '/Chains/11155111.svg',
		isCCIP: true,
		faucetName: 'Sepolia 4',
		faucetUrl: 'https://faucets.chain.link/sepolia',
		searchKeywords: ['ethereum', 'eth'],
	},
	{
		chainName: 'Sepolia',
		logoUrl: '/Chains/11155111.svg',
		isCCIP: true,
		faucetName: 'Sepolia 5',
		faucetUrl: 'https://www.infura.io/zh/faucet/sepolia',
		searchKeywords: ['ethereum', 'eth'],
	},

	// ARBITRUM SEPOLIA
	{
		chainName: 'Arbitrum',
		logoUrl: '/Chains/421614.svg',
		isCCIP: true,
		faucetName: 'Arbitrum 1',
		faucetUrl: 'https://www.alchemy.com/faucets/arbitrum-sepolia',
		searchKeywords: ['arb'],
	},
	{
		chainName: 'Arbitrum',
		logoUrl: '/Chains/421614.svg',
		isCCIP: true,
		faucetName: 'Arbitrum 2',
		faucetUrl: 'https://faucets.chain.link/arbitrum-sepolia',
		searchKeywords: ['arb'],
	},

	// MONAD TESTNET
	{
		chainName: 'Monad',
		logoUrl: '/Chains/10143.svg',
		isCCIP: true,
		faucetName: 'Monad 1',
		faucetUrl: 'https://faucet.quicknode.com/monad/testnet',
		searchKeywords: ['mon'],
	},
	{
		chainName: 'Monad',
		logoUrl: '/Chains/10143.svg',
		isCCIP: true,
		faucetName: 'Monad 2',
		faucetUrl: 'https://testnet.monad.xyz/',
		searchKeywords: ['mon'],
	},

	// BASE SEPOLIA
	{
		chainName: 'Base',
		logoUrl: '/Chains/84532.svg',
		isCCIP: true,
		faucetName: 'Base 1',
		faucetUrl: 'https://www.alchemy.com/faucets/base-sepolia',
		searchKeywords: ['coinbase'],
	},
	{
		chainName: 'Base',
		logoUrl: '/Chains/84532.svg',
		isCCIP: true,
		faucetName: 'Base 2',
		faucetUrl: 'https://faucets.chain.link/base-sepolia',
		searchKeywords: ['coinbase'],
	},
	{
		chainName: 'Base',
		logoUrl: '/Chains/84532.svg',
		isCCIP: true,
		faucetName: 'Base 3',
		faucetUrl: 'https://faucet.quicknode.com/base/sepolia',
		searchKeywords: ['coinbase'],
	},
	{
		chainName: 'Base',
		logoUrl: '/Chains/84532.svg',
		isCCIP: true,
		faucetName: 'Base 4',
		faucetUrl: 'https://learnweb3.io/faucets/base_sepolia/',
		searchKeywords: ['coinbase'],
	},
	{
		chainName: 'Base',
		logoUrl: '/Chains/84532.svg',
		isCCIP: true,
		faucetName: 'Base 5',
		faucetUrl: 'https://faucet.chainstack.com/base-testnet-faucet',
		searchKeywords: ['coinbase'],
	},

	// MEGAETH TESTNET
	{
		chainName: 'MegaETH',
		logoUrl: '/Chains/6342.svg',
		isCCIP: false,
		faucetName: 'MegaETH 1',
		faucetUrl: 'https://testnet.megaeth.com/',
		searchKeywords: ['mega', 'eth'],
	},
	{
		chainName: 'MegaETH',
		logoUrl: '/Chains/6342.svg',
		isCCIP: false,
		faucetName: 'MegaETH 2',
		faucetUrl: 'https://faucet.trade/megaeth-testnet-eth-faucet',
		searchKeywords: ['mega', 'eth'],
	},
	{
		chainName: 'MegaETH',
		logoUrl: '/Chains/6342.svg',
		isCCIP: false,
		faucetName: 'MegaETH 3',
		faucetUrl: 'https://www.gas.zip/faucet/megaeth',
		searchKeywords: ['mega', 'eth'],
	},

	// SONEIUM MINATO
	{
		chainName: 'Minato',
		logoUrl: '/Chains/1946.svg',
		isCCIP: true,
		faucetName: 'Minato 1',
		faucetUrl: 'https://faucet.trade/soneium-minato-sepolia-eth-faucet',
		searchKeywords: ['soneium', 'sone'],
	},
	{
		chainName: 'Minato',
		logoUrl: '/Chains/1946.svg',
		isCCIP: true,
		faucetName: 'Minato 2',
		faucetUrl: 'https://faucets.alchemy.com/faucets/soneium-minato',
		searchKeywords: ['soneium', 'sone'],
	},
	{
		chainName: 'Minato',
		logoUrl: '/Chains/1946.svg',
		isCCIP: true,
		faucetName: 'Minato 3',
		faucetUrl: 'https://thirdweb.com/soneium-minato',
		searchKeywords: ['soneium', 'sone'],
	},
	{
		chainName: 'Minato',
		logoUrl: '/Chains/1946.svg',
		isCCIP: true,
		faucetName: 'Minato 4',
		faucetUrl: 'https://docs.soneium.org/docs/builders/tools/faucets',
		searchKeywords: ['soneium', 'sone'],
	},

	// APECHAIN CURTIS
	{
		chainName: 'Curtis',
		logoUrl: '/Chains/33111.svg',
		isCCIP: true,
		faucetName: 'Curtis',
		faucetUrl: 'https://curtis.hub.caldera.xyz/',
		searchKeywords: ['apechain', 'ape'],
	},

	// AVALANCHE FUJI
	{
		chainName: 'Fuji',
		logoUrl: '/Chains/43113.svg',
		isCCIP: true,
		faucetName: 'Fuji 1',
		faucetUrl: 'https://core.app/tools/testnet-faucet/?subnet=c&token=c',
		searchKeywords: ['avalanche', 'avax'],
	},
	{
		chainName: 'Fuji',
		logoUrl: '/Chains/43113.svg',
		isCCIP: true,
		faucetName: 'Fuji 2',
		faucetUrl: 'https://faucet.quicknode.com/avalanche/fuji',
		searchKeywords: ['avalanche', 'avax'],
	},
	{
		chainName: 'Fuji',
		logoUrl: '/Chains/43113.svg',
		isCCIP: true,
		faucetName: 'Fuji 3',
		faucetUrl: 'https://faucets.chain.link/fuji',
		searchKeywords: ['avalanche', 'avax'],
	},
	{
		chainName: 'Fuji',
		logoUrl: '/Chains/43113.svg',
		isCCIP: true,
		faucetName: 'Fuji 4',
		faucetUrl: 'https://tokentool.bitbond.com/faucet/avalanche-fuji',
		searchKeywords: ['avalanche', 'avax'],
	},

	// UNICHAIN SEPOLIA
	{
		chainName: 'Unichain',
		logoUrl: '/Chains/1301.svg',
		isCCIP: true,
		faucetName: 'Unichain 1',
		faucetUrl: 'https://console.optimism.io/faucet',
		searchKeywords: ['uniswap', 'uni'],
	},
	{
		chainName: 'Unichain',
		logoUrl: '/Chains/1301.svg',
		isCCIP: true,
		faucetName: 'Unichain 2',
		faucetUrl: 'https://faucet.quicknode.com/unichain/sepolia',
		searchKeywords: ['uniswap', 'uni'],
	},
	{
		chainName: 'Unichain',
		logoUrl: '/Chains/1301.svg',
		isCCIP: true,
		faucetName: 'Unichain 3',
		faucetUrl: 'https://www.l2faucet.com/unichain',
		searchKeywords: ['uniswap', 'uni'],
	},
	{
		chainName: 'Unichain',
		logoUrl: '/Chains/1301.svg',
		isCCIP: true,
		faucetName: 'Unichain 4',
		faucetUrl: 'https://thirdweb.com/unichain-sepolia-testnet',
		searchKeywords: ['uniswap', 'uni'],
	},

	// OPTIMISM SEPOLIA
	{
		chainName: 'Optimism',
		logoUrl: '/Chains/11155420.svg',
		isCCIP: true,
		faucetName: 'Optimism 1',
		faucetUrl: 'https://www.alchemy.com/faucets/optimism-sepolia',
		searchKeywords: ['op'],
	},
	{
		chainName: 'Optimism',
		logoUrl: '/Chains/11155420.svg',
		isCCIP: true,
		faucetName: 'Optimism 2',
		faucetUrl: 'https://console.optimism.io/faucet',
		searchKeywords: ['op'],
	},
	{
		chainName: 'Optimism',
		logoUrl: '/Chains/11155420.svg',
		isCCIP: true,
		faucetName: 'Optimism 3',
		faucetUrl: 'https://faucet.quicknode.com/optimism/sepolia',
		searchKeywords: ['op'],
	},
	{
		chainName: 'Optimism',
		logoUrl: '/Chains/11155420.svg',
		isCCIP: true,
		faucetName: 'Optimism 4',
		faucetUrl: 'https://getblock.io/faucet/op-sepolia/',
		searchKeywords: ['op'],
	},

	// INK SEPOLIA
	{
		chainName: 'Ink',
		logoUrl: '/Chains/763373.svg',
		isCCIP: true,
		faucetName: 'Ink 1',
		faucetUrl: 'https://console.optimism.io/faucet',
		searchKeywords: [],
	},
	{
		chainName: 'Ink',
		logoUrl: '/Chains/763373.svg',
		isCCIP: true,
		faucetName: 'Ink 2',
		faucetUrl: 'https://faucet.quicknode.com/ink/sepolia',
		searchKeywords: [],
	},

	// CELO ALFAJORES
	{
		chainName: 'Alfajores',
		logoUrl: '/Chains/44787.svg',
		isCCIP: true,
		faucetName: 'Alfajores 1',
		faucetUrl: 'https://faucet.celo.org/alfajores',
		searchKeywords: ['celo'],
	},
	{
		chainName: 'Alfajores',
		logoUrl: '/Chains/44787.svg',
		isCCIP: true,
		faucetName: 'Alfajores 2',
		faucetUrl: 'https://learnweb3.io/faucets/celo_alfajores/',
		searchKeywords: ['celo'],
	},

	// BNB TESTNET
	{
		chainName: 'BSC',
		logoUrl: '/Chains/97.svg',
		isCCIP: true,
		faucetName: 'BSC 1',
		faucetUrl: 'https://www.bnbchain.org/en/testnet-faucet',
		searchKeywords: ['bnb', 'binance'],
	},
	{
		chainName: 'BSC',
		logoUrl: '/Chains/97.svg',
		isCCIP: true,
		faucetName: 'BSC 2',
		faucetUrl: 'https://tokentool.bitbond.com/faucet/bsc-testnet',
		searchKeywords: ['bnb', 'binance'],
	},
	{
		chainName: 'BSC',
		logoUrl: '/Chains/97.svg',
		isCCIP: true,
		faucetName: 'BSC 3',
		faucetUrl: 'https://faucet.quicknode.com/binance-smart-chain/bnb-testnet',
		searchKeywords: ['bnb', 'binance'],
	},
	{
		chainName: 'BSC',
		logoUrl: '/Chains/97.svg',
		isCCIP: true,
		faucetName: 'BSC 4',
		faucetUrl: 'https://faucet.chainstack.com/bnb-testnet-faucet',
		searchKeywords: ['bnb', 'binance'],
	},

	// RONIN SAIGON
	{
		chainName: 'Saigon',
		logoUrl: '/Chains/2021.svg',
		isCCIP: true,
		faucetName: 'Saigon',
		faucetUrl: 'https://faucet.roninchain.com/',
		searchKeywords: ['ronin', 'axie'],
	},

	// BOTANIX TESTNET
	{
		chainName: 'Botanix',
		logoUrl: '/Chains/3636.svg',
		isCCIP: true,
		faucetName: 'Botanix',
		faucetUrl: 'https://faucet.botanixlabs.dev/',
		searchKeywords: ['btx'],
	},

	// BITLAYER TESTNET
	{
		chainName: 'Bitlayer',
		logoUrl: '/Chains/200810.svg',
		isCCIP: true,
		faucetName: 'Bitlayer',
		faucetUrl: 'https://www.bitlayer.org/faucet',
		searchKeywords: ['btl', 'bitcoin layer'],
	},

	// BLAST SEPOLIA
	{
		chainName: 'Blast',
		logoUrl: '/Chains/168587773.svg',
		isCCIP: true,
		faucetName: 'Blast 1',
		faucetUrl: 'https://faucets.chain.link/blast-sepolia',
		searchKeywords: [],
	},
	{
		chainName: 'Blast',
		logoUrl: '/Chains/168587773.svg',
		isCCIP: true,
		faucetName: 'Blast 2',
		faucetUrl: 'https://faucet.quicknode.com/blast/sepolia',
		searchKeywords: [],
	},
	{
		chainName: 'Blast',
		logoUrl: '/Chains/168587773.svg',
		isCCIP: true,
		faucetName: 'Blast 3',
		faucetUrl: 'https://blastapi.io/faucets/blastl2-testnet',
		searchKeywords: [],
	},

	// CORE TESTNET
	{
		chainName: 'Core',
		logoUrl: '/Chains/1114.svg',
		isCCIP: true,
		faucetName: 'Core 1',
		faucetUrl: 'https://scan.test.btcs.network/faucet',
		searchKeywords: [],
	},
	{
		chainName: 'Core',
		logoUrl: '/Chains/1114.svg',
		isCCIP: true,
		faucetName: 'Core 2',
		faucetUrl: 'https://thirdweb.com/core-blockchain-testnet',
		searchKeywords: [],
	},

	// CRONOS TESTNET
	{
		chainName: 'Cronos',
		logoUrl: '/Chains/338.svg',
		isCCIP: true,
		faucetName: 'Cronos',
		faucetUrl: 'https://cronos.org/faucet',
		searchKeywords: ['crypto.com', 'cro'],
	},

	// GNOSIS CHIADO
	{
		chainName: 'Chiado',
		logoUrl: '/Chains/10200.svg',
		isCCIP: true,
		faucetName: 'Chiado 1',
		faucetUrl: 'https://faucet.chiadochain.net/',
		searchKeywords: ['gnosis', 'gno'],
	},
	{
		chainName: 'Chiado',
		logoUrl: '/Chains/10200.svg',
		isCCIP: true,
		faucetName: 'Chiado 2',
		faucetUrl: 'https://stakely.io/faucet/gnosis-chain-xdai',
		searchKeywords: ['gnosis', 'gno'],
	},

	// HASHKEY TESTNET
	{
		chainName: 'HashKey',
		logoUrl: '/Chains/133.svg',
		isCCIP: true,
		faucetName: 'HashKey',
		faucetUrl: 'https://faucet.hsk.xyz/faucet',
		searchKeywords: ['hsk'],
	},

	// LINEA SEPOLIA
	{
		chainName: 'Linea',
		logoUrl: '/Chains/59141.svg',
		isCCIP: true,
		faucetName: 'Linea 1',
		faucetUrl: 'https://www.infura.io/zh/faucet/linea',
		searchKeywords: [],
	},
	{
		chainName: 'Linea',
		logoUrl: '/Chains/59141.svg',
		isCCIP: true,
		faucetName: 'Linea 2',
		faucetUrl: 'https://getblock.io/faucet/linea-sepolia/',
		searchKeywords: [],
	},
	{
		chainName: 'Linea',
		logoUrl: '/Chains/59141.svg',
		isCCIP: true,
		faucetName: 'Linea 3',
		faucetUrl: 'https://www.hackquest.io/faucets/59141',
		searchKeywords: [],
	},
	{
		chainName: 'Linea',
		logoUrl: '/Chains/59141.svg',
		isCCIP: true,
		faucetName: 'Linea 4',
		faucetUrl: 'https://faucets.chain.link/linea-sepolia',
		searchKeywords: [],
	},

	// MANTLE SEPOLIA
	{
		chainName: 'Mantle',
		logoUrl: '/Chains/5003.svg',
		isCCIP: true,
		faucetName: 'Mantle 1',
		faucetUrl: 'https://faucet.testnet.mantle.xyz/',
		searchKeywords: ['mnt'],
	},
	{
		chainName: 'Mantle',
		logoUrl: '/Chains/5003.svg',
		isCCIP: true,
		faucetName: 'Mantle 2',
		faucetUrl: 'https://faucet.quicknode.com/mantle/sepolia',
		searchKeywords: ['mnt'],
	},
	{
		chainName: 'Mantle',
		logoUrl: '/Chains/5003.svg',
		isCCIP: true,
		faucetName: 'Mantle 3',
		faucetUrl: 'https://www.hackquest.io/faucets/5003',
		searchKeywords: ['mnt'],
	},

	// MODE TESTNET
	{
		chainName: 'Mode',
		logoUrl: '/Chains/919.svg',
		isCCIP: true,
		faucetName: 'Mode 1',
		faucetUrl: 'https://console.optimism.io/faucet',
		searchKeywords: [],
	},
	{
		chainName: 'Mode',
		logoUrl: '/Chains/919.svg',
		isCCIP: true,
		faucetName: 'Mode 2',
		faucetUrl: 'https://www.l2faucet.com/mode',
		searchKeywords: [],
	},
	{
		chainName: 'Mode',
		logoUrl: '/Chains/919.svg',
		isCCIP: true,
		faucetName: 'Mode 3',
		faucetUrl: 'https://faucets.chain.link/mode-sepolia',
		searchKeywords: [],
	},

	// POLYGON AMOY
	{
		chainName: 'Amoy',
		logoUrl: '/Chains/80002.svg',
		isCCIP: true,
		faucetName: 'Amoy 1',
		faucetUrl: 'https://faucet.polygon.technology/',
		searchKeywords: ['polygon', 'matic'],
	},
	{
		chainName: 'Amoy',
		logoUrl: '/Chains/80002.svg',
		isCCIP: true,
		faucetName: 'Amoy 2',
		faucetUrl: 'https://faucets.chain.link/polygon-amoy',
		searchKeywords: ['polygon', 'matic'],
	},
	{
		chainName: 'Amoy',
		logoUrl: '/Chains/80002.svg',
		isCCIP: true,
		faucetName: 'Amoy 3',
		faucetUrl: 'https://faucet.stakepool.dev.br/amoy',
		searchKeywords: ['polygon', 'matic'],
	},

	// SCROLL SEPOLIA
	{
		chainName: 'Scroll',
		logoUrl: '/Chains/534351.svg',
		isCCIP: true,
		faucetName: 'Scroll 1',
		faucetUrl: 'https://faucet.quicknode.com/scroll',
		searchKeywords: [],
	},
	{
		chainName: 'Scroll',
		logoUrl: '/Chains/534351.svg',
		isCCIP: true,
		faucetName: 'Scroll 2',
		faucetUrl: 'https://faucets.chain.link/scroll-sepolia-testnet',
		searchKeywords: [],
	},
	{
		chainName: 'Scroll',
		logoUrl: '/Chains/534351.svg',
		isCCIP: true,
		faucetName: 'Scroll 3',
		faucetUrl: 'https://www.l2faucet.com/scroll',
		searchKeywords: [],
	},
	{
		chainName: 'Scroll',
		logoUrl: '/Chains/534351.svg',
		isCCIP: true,
		faucetName: 'Scroll 4',
		faucetUrl: 'https://faucet.chainstack.com/scroll-sepolia-testnet-faucet',
		searchKeywords: [],
	},
	{
		chainName: 'Scroll',
		logoUrl: '/Chains/534351.svg',
		isCCIP: true,
		faucetName: 'Scroll 5',
		faucetUrl: 'https://bwarelabs.com/faucets/scroll-testnet',
		searchKeywords: [],
	},
	{
		chainName: 'Scroll',
		logoUrl: '/Chains/534351.svg',
		isCCIP: true,
		faucetName: 'Scroll 6',
		faucetUrl: 'https://thirdweb.com/scroll-sepolia-testnet',
		searchKeywords: [],
	},
	{
		chainName: 'Scroll',
		logoUrl: '/Chains/534351.svg',
		isCCIP: true,
		faucetName: 'Scroll 7',
		faucetUrl: 'https://scroll.faucetme.pro/',
		searchKeywords: [],
	},

	// SEI TESTNET
	{
		chainName: 'Sei',
		logoUrl: '/Chains/1328.svg',
		isCCIP: true,
		faucetName: 'Sei 1',
		faucetUrl: 'https://sei-faucet.nima.enterprises/',
		searchKeywords: [],
	},
	{
		chainName: 'Sei',
		logoUrl: '/Chains/1328.svg',
		isCCIP: true,
		faucetName: 'Sei 2',
		faucetUrl: 'https://www.allthatnode.com/faucet/sei.dsrv',
		searchKeywords: [],
	},

	// SHIBARIUM PUPPYNET
	{
		chainName: 'Puppynet',
		logoUrl: '/Chains/157.svg',
		isCCIP: true,
		faucetName: 'Puppynet',
		faucetUrl: 'https://shibarium.shib.io/faucet',
		searchKeywords: ['shibarium', 'shiba', 'shib'],
	},

	// XLAYER SEPOLIA
	{
		chainName: 'XLayer',
		logoUrl: '/Chains/195.svg',
		isCCIP: true,
		faucetName: 'XLayer 1',
		faucetUrl: 'https://www.okx.com/xlayer/faucet',
		searchKeywords: [],
	},
	{
		chainName: 'XLayer',
		logoUrl: '/Chains/195.svg',
		isCCIP: true,
		faucetName: 'XLayer 2',
		faucetUrl: 'https://www.l2faucet.com/x-layer',
		searchKeywords: [],
	},

	// ZIRCUIT TESTNET
	{
		chainName: 'Zircuit',
		logoUrl: '/Chains/48899.svg',
		isCCIP: true,
		faucetName: 'Zircuit',
		faucetUrl: 'https://bridge.testnet.zircuit.com/',
		searchKeywords: [],
	},

	// PHAROS TESTNET
	{
		chainName: 'Pharos',
		logoUrl: '/Chains/688688.svg',
		isCCIP: false,
		faucetName: 'Pharos 1',
		faucetUrl: 'https://testnet.pharosnetwork.xyz',
		searchKeywords: ['pharos'],
	},
]
