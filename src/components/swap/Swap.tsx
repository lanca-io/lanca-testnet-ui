import type { FC } from 'react'
import { NotWhitelisted } from '../common/NotWhitelisted/NotWhitelisted'
import { GetTokens } from '../common/GetTokens/GetTokens'
import { ProcessCard } from '../common/ProcessCard/ProcessCard'

import './Swap.pcss'

export const Swap: FC = () => {
	const isWhitelisted = true
	const hasTokens = true

	return (
		<div className="swap">
			<ProcessCard />
			{!isWhitelisted && <NotWhitelisted />}
			{!hasTokens && <GetTokens />}
		</div>
	)
}
