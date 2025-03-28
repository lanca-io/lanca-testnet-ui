import type { FC } from 'react'
import { Button } from '@concero/ui-kit'
import './SwapCard.pcss'

export const SwapCard: FC = (): JSX.Element => {
	return (
		<div className="swap-card-wrapper">
			<div className="swap-card">
				<Button variant="primary" size="l" className="swap-card__button" isFull>
					Begin Swap
				</Button>
			</div>
		</div>
	)
}
