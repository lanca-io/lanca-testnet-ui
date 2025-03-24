import { FC, useMemo } from 'react'
import { IconButton } from '@concero/ui-kit'
import { GasIcon } from '@/assets/icons/gas'
import { AddIcon } from '@/assets/icons/add'
import './GasWidget.pcss'

const COLORS = {
	PURPLE: 'var(--color-accent-600)',
	GRAY: 'var(--color-gray-600)',
}

export const GasWidget: FC = () => {
	const gas = 100

	const uiProps = useMemo<{
		gasColor: string
		addColor: string
		buttonVariant: 'secondary' | 'secondary_color'
	}>(() => {
		const hasGas = gas > 0

		return {
			gasColor: hasGas ? COLORS.PURPLE : COLORS.GRAY,
			addColor: hasGas ? COLORS.GRAY : COLORS.PURPLE,
			buttonVariant: hasGas ? 'secondary' : ('secondary_color' as const),
		}
	}, [gas])

	return (
		<div className="gas-widget">
			<GasIcon color={uiProps.gasColor} />
			<h5 className="gas-value">{gas}</h5>
			<IconButton size="s" onClick={() => {}} variant={uiProps.buttonVariant}>
				<AddIcon color={uiProps.addColor} />
			</IconButton>
		</div>
	)
}
