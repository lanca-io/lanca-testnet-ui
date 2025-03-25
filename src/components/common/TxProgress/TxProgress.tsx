import { FC, memo, useMemo } from 'react'
import { TxStep } from '../TxStep/TxStep'
import { RightIcon } from '@/assets/icons/right'
import { StepStatus, StepType } from '@/stores/tx-execution/types'
import './TxProgress.pcss'

type TxProgressProps = {
	approvalStatus: StepStatus
	bridgeStatus: StepStatus
}

export const TxProgress: FC<TxProgressProps> = memo(({ approvalStatus, bridgeStatus }): JSX.Element => {
	const steps = useMemo(
		() => (
			<>
				<TxStep step={StepType.Approval} status={approvalStatus} />
				<RightIcon />
				<TxStep step={StepType.Bridge} status={bridgeStatus} />
			</>
		),
		[approvalStatus, bridgeStatus],
	)

	return <div className="tx-progress">{steps}</div>
})
