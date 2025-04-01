import type { FC } from 'react'
import { useMemo } from 'react'
import { useFormStore } from '@/stores/form/useFormStore'
import { RightIcon } from '@/assets/icons/right'
import './Bridge.pcss'

export const Bridge: FC = (): JSX.Element => {
	const { sourceChain, destinationChain } = useFormStore()

	const sourceLogo = useMemo(() => sourceChain?.logoURL || '', [sourceChain])
	const destinationLogo = useMemo(() => destinationChain?.logoURL || '', [destinationChain])

	return (
		<div className="bridge-content">
			<div className="bridge-content__from">
				<img src={sourceLogo} alt="Source Token" className="bridge-content__image" />
			</div>
			<RightIcon />
			<div className="bridge-content__to">
				<img src={destinationLogo} alt="Destination Token" className="bridge-content__image" />
			</div>
		</div>
	)
}
