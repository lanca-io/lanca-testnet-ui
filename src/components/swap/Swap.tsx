import type { FC } from 'react'
import { lazy } from 'react'
import { SwapWidget } from '../common/SwapWidget/SwapWidget'
import { useAccount } from 'wagmi'
import { ScreenLoader } from '../common/ScreenLoader/ScreenLoader'
import { useIsWhitelisted } from '@/hooks/useIsWhitelisted'
import { useHasTestTokens } from '@/hooks/useHasTestTokens'
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

	const isLoading = isConnecting || isCheckLoading || isWhitelistLoading

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

	return <div className="swap">{renderContent()}</div>
}
