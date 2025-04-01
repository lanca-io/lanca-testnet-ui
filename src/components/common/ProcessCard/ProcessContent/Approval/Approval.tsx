import type { FC } from 'react'
import { useMemo } from 'react'
import './Approval.pcss'

export const Approval: FC = (): JSX.Element => {
	const imageSrc = useMemo(() => '/Swap/Process.svg', [])
	const altText = useMemo(() => 'Approval Process', [])

	return (
		<div className="approval-content">
			<img src={imageSrc} alt={altText} className="approval-content__image" />
		</div>
	)
}
