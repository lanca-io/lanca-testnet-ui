import type { FC } from 'react'
import { useMemo, useCallback } from 'react'
import { Button } from '@concero/ui-kit'
import { useGetRoute } from '@/hooks/useGetRoute'
import { useExecuteRoute } from '@/hooks/useExecuteRoute'
import { useFormStore } from '@/stores/form/useFormStore'
import { Status } from '@lanca/sdk'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'
import './SwapCard.pcss'

export const SwapCard: FC = () => {
	const { txStatus } = useTxExecutionStore()
	const { fromAmount, error } = useFormStore()

	const route = useGetRoute()
	const executeRoute = useExecuteRoute(route)

	const isDisabled = useMemo(
		() => !!error || !fromAmount || fromAmount === '0' || fromAmount === '',
		[error, fromAmount],
	)

	const handleClick = useCallback(() => {
		executeRoute()
	}, [executeRoute])

	return (
		<div className="swap-card-wrapper">
			<div className="swap-card">
				<Button
					variant="primary"
					size="l"
					isDisabled={isDisabled}
					isLoading={txStatus === Status.PENDING}
					className="swap-card__button"
					isFull
					onClick={handleClick}
				>
					Begin Swap
				</Button>
			</div>
		</div>
	)
}
