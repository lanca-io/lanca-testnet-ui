import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'
import { IconButton } from '@concero/ui-kit'
import { SwapIcon } from '@/assets/icons/swap'
import { useFormStore } from '@/stores/form/useFormStore'
import './CardSwitcher.pcss'

export const CardSwitcher: FC = (): JSX.Element => {
	const { swapTokensAndChains } = useFormStore()
	const [topOffset, setTopOffset] = useState<number | null>(null)
	const sourceCardRef = useRef<HTMLElement | null>(null)

	useEffect(() => {
		const sourceCard = document.querySelector('.source-card') as HTMLElement
		sourceCardRef.current = sourceCard

		const updatePosition = () => {
			if (sourceCardRef.current) {
				setTopOffset(sourceCardRef.current.offsetHeight - 15)
			}
		}

		updatePosition()

		const resizeObserver = new ResizeObserver(updatePosition)
		if (sourceCardRef.current) resizeObserver.observe(sourceCardRef.current)

		return () => {
			if (sourceCardRef.current) resizeObserver.unobserve(sourceCardRef.current)
			resizeObserver.disconnect()
		}
	}, [])

	return (
		<div className="card-switcher" style={topOffset !== null ? { top: `${topOffset}px` } : undefined}>
			<IconButton size="s" variant="secondary" className="card-switcher__button" onClick={swapTokensAndChains}>
				<SwapIcon />
			</IconButton>
		</div>
	)
}
