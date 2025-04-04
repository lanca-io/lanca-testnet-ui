import { FC, useMemo, memo } from 'react'
import { IconButton } from '@concero/ui-kit'
import { GasIcon } from '@/assets/icons/gas'
import { AddIcon } from '@/assets/icons/add'
import { useBalancesStore } from '@/stores/balances/useBalancesStore'
import { useFormStore } from '@/stores/form/useFormStore'
import { useAccount } from 'wagmi'
import { formatTokenAmount } from '@/utils/tokens'
import { SkeletonLoader } from '../SkeletonLoader/SkeletonLoader'
import { format } from '@/utils/format'
import './GasWidget.pcss'

const COLORS = {
	PURPLE: 'var(--color-accent-600)',
	GRAY: 'var(--color-gray-600)',
}

export const GasWidget: FC = memo(() => {
	const { isConnected } = useAccount()
	const { sourceChain } = useFormStore()
	const { nativeBalances, isLoading } = useBalancesStore()

	const rawAmount = useMemo(() => {
		if (!sourceChain || !nativeBalances[Number(sourceChain.id)]) {
			return '0'
		}
		return nativeBalances[Number(sourceChain.id)].balance
	}, [sourceChain, nativeBalances])

	const gas = useMemo(
		() => formatTokenAmount(rawAmount, sourceChain?.decimals || 18),
		[rawAmount, sourceChain?.decimals],
	)

	const uiProps = useMemo<{
		gasColor: string
		addColor: string
		buttonVariant: 'secondary' | 'secondary_color'
	}>(() => {
		const hasGas = !isLoading && Number(gas) > 0

		return {
			gasColor: hasGas || isLoading ? COLORS.PURPLE : COLORS.GRAY,
			addColor: hasGas || isLoading ? COLORS.GRAY : COLORS.PURPLE,
			buttonVariant: hasGas ? 'secondary' : ('secondary_color' as const),
		}
	}, [gas, isLoading])

	if (!isConnected) {
		return null
	}

	return (
		<div className="gas_widget">
			<GasIcon color={uiProps.gasColor} />
			{isLoading ? (
				<SkeletonLoader width={28} height={22} className="loader" />
			) : (
				<h5 className="gas_value">{format(Number(gas), 2)}</h5>
			)}

			<IconButton size="s" variant={uiProps.buttonVariant}>
				<AddIcon color={uiProps.addColor} />
			</IconButton>
		</div>
	)
})
