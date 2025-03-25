import type { FC } from 'react'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'
import { RightIcon } from '@/assets/icons/right'
import './ProcessContent.pcss'

export const ApprovalContent: FC = (): JSX.Element => {
	return (
		<div className="approval-content">
			<img src="/Swap/Process.svg" alt="Process" />
		</div>
	)
}

export const BridgeContent: FC = (): JSX.Element => {
	return (
		<div className="bridge-content">
			<div className="bridge-content__from">
				<img src="" alt="Token" className="bridge-content__img" />
			</div>
			<RightIcon />
			<div className="bridge-content__to">
				<img src="" alt="Token" className="bridge-content__img" />
			</div>
		</div>
	)
}

export const FailureContent: FC = (): JSX.Element => {
	return (
		<div className="failure-content">
			<img src="/Swap/Failure.svg" alt="Process" />
		</div>
	)
}

export const SuccessContent: FC = (): JSX.Element => {
	return (
		<>
			<div className="success-content">
				<img src="/Swap/Failure.svg" alt="Process" />
			</div>
			<div className="success-data">
				<div className="success-data__heading__container">
					<h5 className="success-data__headding">You received</h5>
				</div>
			</div>
		</>
	)
}

export const ProcessContent: FC = (): JSX.Element => {
	const { activeStep } = useTxExecutionStore()
	return <FailureContent />
}
