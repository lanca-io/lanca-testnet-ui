import type { FC } from 'react'
import { RaceBy } from '@uiball/loaders'
import './ScreenLoader.pcss'

export const ScreenLoader: FC = (): JSX.Element => {
	return (
		<div className="screen-loader">
			<RaceBy color="var(--color-accent-500)" />
		</div>
	)
}
