import type { FC } from 'react'
import { memo, useMemo, useRef, useEffect } from 'react'
import { Approval } from './Approval/Approval'
import { Bridge } from './Bridge/Bridge'
import { Failure } from './Failure/Failure'
import { Success } from './Success/Success'
import { useTxProcess } from '@/hooks/useTxProcess'
import { Status, StepType } from '@lanca/sdk'
import { useTrackEvent } from '@/hooks/useTrackEvent'
import { BridgeEvents } from '@/events/events'
import { useIsCCIPLane } from '@/hooks/useIsCCIPLane'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'
import { useFormStore } from '@/stores/form/useFormStore'
import './ProcessContent.pcss'

const trackedEvents = {
	SUCCESS: false,
	FAILED: false,
	REJECTED: false,
}

export const ProcessContent: FC = memo((): JSX.Element | null => {
	const { txStatus, currentStep, executionTime } = useTxProcess()
	const { sourceChain, destinationChain, fromTokenAddress, toTokenAddress } = useFormStore()
	const { srcHash, dstHash, error } = useTxExecutionStore()
	const { isCCIPLane } = useIsCCIPLane()
	const { trackEvent: tracker } = useTrackEvent()

	const trackEvent = (eventType: string, eventData: any) => {
		if (trackedEvents[eventType as keyof typeof trackedEvents]) {
			return
		}
		trackedEvents[eventType as keyof typeof trackedEvents] = true
		tracker(eventData)
	}

const content = useMemo(() => {
	switch (txStatus) {
		case Status.FAILED:
			return <Failure />

		case Status.REJECTED:
			trackEvent('REJECTED', {
				...BridgeEvents.REJECTED,
				data: {
					srcChainId: sourceChain?.id,
					srcChainName: sourceChain?.name,
					dstChainId: destinationChain?.id,
					dstChainName: destinationChain?.name,
					fromToken: fromTokenAddress,
					toToken: toTokenAddress,
					isCCIPLane,
					srcHash,
				},
			})
			return <Failure />

		case Status.SUCCESS:
			trackEvent('SUCCESS', {
				...BridgeEvents.SUCCESSFUL,
				data: {
					srcChainId: sourceChain?.id,
					srcChainName: sourceChain?.name,
					dstChainId: destinationChain?.id,
					dstChainName: destinationChain?.name,
					fromToken: fromTokenAddress,
					toToken: toTokenAddress,
					isCCIPLane,
					srcHash,
					dstHash,
					executionTime,
				},
			})
			return <Success />

		case Status.PENDING:
			if (currentStep === StepType.ALLOWANCE) return <Approval />
			if (currentStep === StepType.BRIDGE) return <Bridge />
			return null

		default:
			return null
	}
}, [txStatus, currentStep, error])

	return (
		<div className="process_content" data-testid="process-content">
			{content}
		</div>
	)
})
