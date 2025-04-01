import type { FC } from 'react'
import { useMemo } from 'react'
import './Failure.pcss'

export const Failure: FC = (): JSX.Element => {
	const imageSrc = useMemo(() => '/Swap/Failure.svg', [])
	const altText = useMemo(() => 'Failure Process', [])

	return (
		<div className="failure-content">
			<img src={imageSrc} alt={altText} className="failure-content__image" />
		</div>
	)
}
