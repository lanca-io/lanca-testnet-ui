import type { FC } from 'react'
import { memo } from 'react'
import './Approval.pcss'

export const Approval: FC = memo((): JSX.Element => {
	const imageSrc = '/Swap/Process.webp'
	const altText = 'Approval Process'

	return (
		<div className="approval_content">
			<img src={imageSrc} alt={altText} className="approval_content_image" />
		</div>
	)
})
