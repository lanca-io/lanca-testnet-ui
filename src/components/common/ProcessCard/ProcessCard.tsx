import { FC } from 'react'
import { ProcessHeading } from './ProcessHeading/ProcessHeading'
import { ProcessContent } from './ProcessContent/ProcessContent'
import { TxProgress } from '../TxProgress/TxProgress'

import './ProcessCard.pcss'

export const ProcessCard: FC = (): JSX.Element => {
	return (
		<div className="process-card">
			<ProcessHeading />
			<ProcessContent />
			<TxProgress />
		</div>
	)
}
