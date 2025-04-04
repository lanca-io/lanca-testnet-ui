import type { FC } from 'react'
import { lazy } from 'react'
import { SwapWidget } from '../common/SwapWidget/SwapWidget'
import { useAccount } from 'wagmi'
import { ScreenLoader } from '../common/ScreenLoader/ScreenLoader'
import { useIsWhitelisted } from '@/hooks/useIsWhitelisted'
import { useHasTestTokens } from '@/hooks/useHasTestTokens'
import { useIsDesktop } from '@/hooks/useMediaQuery'
import { TokenWidget } from '../common/TokenWidget/TokenWidget'
import { GasWidget } from '../common/GasWidget/GasWidget'
import { useTxProcess } from '@/hooks/useTxProcess'
import { Status } from '@lanca/sdk'
import './Swap.pcss'


const NotWhitelisted = lazy(() =>
	import('../common/NotWhitelisted/NotWhitelisted').then(module => ({
		default: module.NotWhitelisted,
	})),
)

const GetTokens = lazy(() =>
	import('../common/GetTokens/GetTokens').then(module => ({
		default: module.GetTokens,
	})),
)

export const Swap: FC = () => {
	const { isConnected, isConnecting } = useAccount()
	const { isWhitelisted, isLoading: isWhitelistLoading } = useIsWhitelisted()
	const { hasTokens, isLoading: isCheckLoading } = useHasTestTokens()
	const { txStatus } = useTxProcess()

	const isDesktop = useIsDesktop()
	const isLoading = isConnecting || isCheckLoading || isWhitelistLoading
	const isWidgetVisible = !isDesktop && txStatus === Status.NOT_STARTED && isWhitelisted

	if (isLoading) {
		return <ScreenLoader />
	}

	const renderContent = () => {
		if (!isConnected) {
			return <SwapWidget />
		}

		switch (true) {
			case !isWhitelisted:
				return <NotWhitelisted />

			case !hasTokens:
				return <GetTokens />

			default:
				return <SwapWidget />
		}
	}

	return (
			<div className="swap">
				<div className="swap_widgets">
					{isWidgetVisible && <TokenWidget />}
					{isWidgetVisible && <GasWidget />}
				</div>

				{renderContent()}
			</div> 
		)
}
