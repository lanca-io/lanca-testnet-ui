import type { FC } from 'react'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'
import { useTxProcess } from '@/hooks/useTxProcess'
import { Button } from '@concero/ui-kit'
import { Status } from '@lanca/sdk'
import './ProcessAction.pcss'

export const ProcessAction: FC = (): JSX.Element | null => {
	const { reset } = useTxExecutionStore()
	const { txStatus } = useTxProcess()

	if (txStatus === Status.FAILED || txStatus === Status.REJECTED) {
		return (
			<div className={`process-action__${txStatus.toLowerCase()}`}>
				<div className="process-action">
					<Button variant="secondary_color" size="l" isFull onClick={reset}>
						Try again
					</Button>
				</div>
			</div>
		)
	}

	if (txStatus === Status.SUCCESS) {
		return (
			<div className={`process-action__${txStatus.toLowerCase()}`}>
				<div className="process-action">
					<Button variant="secondary_color" size="l" isFull onClick={reset}>
						Swap again
					</Button>
					<Button variant="secondary" size="l" isFull>
						Share on X
					</Button>
				</div>
			</div>
		)
	}

	return null
}
