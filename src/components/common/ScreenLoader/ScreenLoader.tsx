import type { FC } from 'react'
import { memo } from 'react'
import { RaceBy } from '@uiball/loaders'
import './ScreenLoader.pcss'

export const ScreenLoader: FC = memo((): JSX.Element => {
	return (
		<div className="screen_loader" data-testid="screen-loader">
			<RaceBy color="var(--color-accent-500)" />
		</div>
	)
})

ScreenLoader.displayName = 'ScreenLoader'
