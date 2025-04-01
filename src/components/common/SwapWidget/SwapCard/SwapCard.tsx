import type { FC } from 'react'
import { Button } from '@concero/ui-kit'
import { useGetRoute } from '@/hooks/useGetRoute'
import { useExecuteRoute } from '@/hooks/useExecuteRoute'
import './SwapCard.pcss'

export const SwapCard: FC = (): JSX.Element => {
	const route = useGetRoute()
	const executeRoute = useExecuteRoute(route)

	return (
		<div className="swap-card-wrapper">
			<div className="swap-card">
				<Button variant="primary" size="l" className="swap-card__button" isFull onClick={() => executeRoute()}>
					Begin Swap
				</Button>
			</div>
		</div>
	)
}
