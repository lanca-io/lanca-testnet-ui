import type { FC } from 'react'
import { memo, useCallback } from 'react'
import { IconButton } from '@concero/ui-kit'
import { LeftIcon } from '@/assets/icons/left'
import { useTxProcess } from '@/hooks/useTxProcess'
import { useProcessHeading } from '@/hooks/useProcessHeading'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'
import './ProcessHeading.pcss'

export const ProcessHeading: FC = memo(() => {
	const { reset } = useTxExecutionStore()
	const { isTerminalStage } = useTxProcess()
	const heading = useProcessHeading()

	const handleReset = useCallback(() => {
		reset()
	}, [reset])

	return (
		<div className={`process_card_heading ${!isTerminalStage ? 'process_card_heading_no_button' : ''}`}>
			{isTerminalStage && (
				<IconButton onClick={handleReset} variant="secondary" size="m" aria-label="Back to swap">
					<LeftIcon />
				</IconButton>
			)}
			<h4 className="process_card_title" data-testid="process-heading">
				{heading}
			</h4>
		</div>
	)
})
