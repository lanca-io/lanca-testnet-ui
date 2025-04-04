import type { FC } from 'react'
import { useMemo, memo } from 'react'
import { useFormStore } from '@/stores/form/useFormStore'
import { RightIcon } from '@/assets/icons/right'
import './Bridge.pcss'

export const Bridge: FC = memo((): JSX.Element => {
	const { sourceChain, destinationChain } = useFormStore()

	const sourceLogo = useMemo(() => sourceChain?.logoURL || '', [sourceChain])
	const destinationLogo = useMemo(() => destinationChain?.logoURL || '', [destinationChain])

	return (
		<div className="bridge_content">
			<div className="bridge_content_from">
				<img
					src={sourceLogo}
					alt="Source Token"
					className="bridge_content_image"
					data-testid="source-chain-logo"
				/>
			</div>
			<RightIcon />
			<div className="bridge_content_to">
				<img
					src={destinationLogo}
					alt="Destination Token"
					className="bridge_content_image"
					data-testid="destination-chain-logo"
				/>
			</div>
		</div>
	)
})
