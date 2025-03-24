import type { FC } from 'react'
import { NotWhitelisted } from '@/components/common/NotWhitelisted/NotWhitelisted'
import './Swap.pcss'

export const Swap: FC = () => {
	return (
		<div className="swap">
			<NotWhitelisted />
		</div>
	)
}
