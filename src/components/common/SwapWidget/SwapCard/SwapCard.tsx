import type { FC } from 'react'
import { useMemo, useCallback, memo } from 'react'
import { Button } from '@concero/ui-kit'
import { useGetRoute } from '@/hooks/useGetRoute'
import { useExecuteRoute } from '@/hooks/useExecuteRoute'
import { useFormStore } from '@/stores/form/useFormStore'
import { Status } from '@lanca/sdk'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'
import { useAppKit } from '@reown/appkit/react'
import { useAccount } from 'wagmi'
import './SwapCard.pcss'

export const SwapCard: FC = memo(() => {
	const { open } = useAppKit()
	const { isConnected } = useAccount()
	const { txStatus } = useTxExecutionStore()
	const { fromAmount, error } = useFormStore()

	const route = useGetRoute()
	const executeRoute = useExecuteRoute(route)

	const isDisabled = useMemo(
		() => isConnected && (!!error || !fromAmount || fromAmount === '0' || fromAmount === ''),
		[error, fromAmount, isConnected],
	)

	const handleClick = useCallback(() => {
		if (!isConnected) {
			open()
		} else {
			executeRoute()
		}
	}, [executeRoute, isConnected, open])

	return (
		<div className="swap_card_wrapper">
			<div className="swap_card">
				<Button
					variant="primary"
					size="l"
					isDisabled={isDisabled}
					isLoading={isConnected && txStatus === Status.PENDING}
					className="swap_card_button"
					isFull
					onClick={handleClick}
					data-testid="swap-button"
				>
					{!isConnected ? 'Connect Wallet' : 'Begin Swap'}
				</Button>
			</div>
		</div>
	)
})
