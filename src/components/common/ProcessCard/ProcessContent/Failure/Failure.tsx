import type { FC } from 'react'
import { memo } from 'react'
import './Failure.pcss'

export const Failure: FC = memo((): JSX.Element => {
	const imageSrc = '/Swap/Failure.svg'
	const altText = 'Failure Process'

	return (
		<div className="failure_content">
			<img src={imageSrc} alt={altText} className="failure_content_image" data-testid="failure-image" />
		</div>
	)
})

Failure.displayName = 'Failure'
