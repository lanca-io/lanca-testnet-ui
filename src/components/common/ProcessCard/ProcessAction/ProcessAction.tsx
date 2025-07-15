import type { FC } from 'react'
import { memo, useCallback } from 'react'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'
import { useTxProcess } from '@/hooks/useTxProcess'
import { Button } from '@concero/ui-kit'
import { SocialEvents } from '@/events/events'
import { useTrackEvent } from '@/hooks/useTrackEvent'
import { Status } from '@lanca/sdk'
import { useFormStore } from '@/stores/form/useFormStore'
import './ProcessAction.pcss'

const chainsTwitterMap: Record<number, string> = {
	33111: 'ApeChainHUB',
	421614: 'arbitrum', // ARBITRUM SEPOLIA
	43113: 'avax', // AVALANCHE FUJI
	84532: 'base', // BASE SEPOLIA
	200810: 'BitlayerLabs', // BITLAYER TESTNET
	168587773: 'blast', // BLAST SEPOLIA
	97: 'BNBCHAIN', // BNB TESTNET
	3636: 'BotanixLabs', // BOTANIX TESTNET
	44787: 'Celo', // CELO ALFAJORES
	1114: 'Coredao_Org', // CORE TESTNET
	338: 'cronos_chain', // CRONOS TESTNET
	10200: 'gnosischain', // GNOSIS CHIADO
	133: 'HashKeyGroup', // HASHKEY TESTNET
	763373: 'inkonchain', // INK SEPOLIA
	59141: 'LineaBuild', // LINEA SEPOLIA
	5003: 'Mantle_Official', // MANTLE SEPOLIA
	6342: 'megaeth_labs', // MEGAETH TESTNET
	919: 'modenetwork', // MODE TESTNET
	10143: 'monad_xyz', // MONAD TESTNET
	11155420: 'Optimism', // OPTIMISM SEPOLIA
	80002: '0xPolygon', // POLYGON AMOY
	2021: 'Ronin_Network', // RONIN SAIGON
	534351: 'Scroll_ZKP', // SCROLL SEPOLIA
	1328: 'SeiNetwork', // SEI TESTNET
	11155111: 'ethereum', // SEPOLIA
	157: 'ShibariumNet', // SHIBARIUM PUPPYNET
	1946: 'soneium', // SONEIUM MINATO
	57054: 'SonicLabs', // SONIC BLAZE
	1301: 'unichain', // UNICHAIN SEPOLIA
	195: 'XLayerOfficial', // XLAYER SEPOLIA
	48899: 'ZircuitL2', // ZIRCUIT TESTNET
}

export const ProcessAction: FC = memo((): JSX.Element | null => {
	const { reset, executionTime } = useTxExecutionStore()
	const { sourceChain, destinationChain, setFromAmount } = useFormStore()
	const { txStatus } = useTxProcess()
	const { trackEvent } = useTrackEvent()

	const handleReset = useCallback(() => {
		reset()
		setFromAmount('0')
	}, [reset, setFromAmount])

	const handleShareOnX = useCallback(() => {
		const time = executionTime ? executionTime : '10.00'

		const fromChainHandle = sourceChain?.id
			? chainsTwitterMap[Number(sourceChain.id)] || sourceChain.name
			: 'ethereum'

		const toChainHandle = destinationChain?.id
			? chainsTwitterMap[Number(destinationChain.id)] || destinationChain.name
			: 'ethereum'

		const tweetText = `Just performed a fully decentralised bridge from @${fromChainHandle} to @${toChainHandle} in just ${time} sec on @concero_io testnet using the new Concero Messaging V2.\n\nTry to break my record on https://testnet.concero.io 👇`

		const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`

		trackEvent({
			...SocialEvents.SHARED_ON_X,
		})

		window.open(shareUrl, '_blank', 'noopener,noreferrer')
	}, [trackEvent, executionTime, sourceChain, destinationChain])

	if (txStatus === Status.FAILED || txStatus === Status.REJECTED) {
		return (
			<div className={`process_action_${txStatus.toLowerCase()}`}>
				<div className="process_action">
					<Button
						variant="secondary_color"
						size="l"
						isFull
						onClick={handleReset}
						data-testid="try-again-button"
					>
						Try again
					</Button>
				</div>
			</div>
		)
	}

	if (txStatus === Status.SUCCESS) {
		return (
			<div className={`process_action_${txStatus.toLowerCase()}`}>
				<div className="process_action">
					<Button
						variant="secondary_color"
						size="l"
						isFull
						onClick={handleReset}
						data-testid="swap-again-button"
					>
						Swap again
					</Button>
					<Button variant="secondary" size="l" isFull onClick={handleShareOnX} data-testid="share-x-button">
						Share on X
					</Button>
				</div>
			</div>
		)
	}

	return null
})

