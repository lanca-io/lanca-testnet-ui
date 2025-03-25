import type { FC } from 'react'
import { NotWhitelisted } from '../common/NotWhitelisted/NotWhitelisted'
import { GetTokens } from '../common/GetTokens/GetTokens'

import './Swap.pcss'
import { SwapWidget } from '../common/SwapWidget/SwapWidget'

export const Swap: FC = () => {
	const isWhitelisted = true
	const hasTokens = true

	return (
		<div className="swap">
			<SwapWidget />
			{!isWhitelisted && <NotWhitelisted />}
			{!hasTokens && <GetTokens />}
		</div>
	)
}
