import { useMemo, useEffect, useCallback } from 'react'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'
import { Status, StepType } from '@lanca/sdk'
import { useIsCCIPLane } from './useIsCCIPLane'
import { useTrackEvent } from './useTrackEvent'
import { BridgeEvents } from '@/events/events'
import { useFormStore } from '@/stores/form/useFormStore'

export const useTxProcess = () => {
	const { sourceChain, destinationChain, fromTokenAddress, toTokenAddress } = useFormStore()
    const { txStatus, steps, srcHash, dstHash, executionTime } = useTxExecutionStore()
    const { isCCIPLane } = useIsCCIPLane()
    const { trackEvent } = useTrackEvent()

	const trackBridgeEvent = useCallback(() => {
		switch (txStatus) {
			case Status.SUCCESS:
				trackEvent({
					...BridgeEvents.SUCCESSFUL,
					data: {
						srcChainId: sourceChain?.id,
						dstChainId: destinationChain?.id,
						fromToken: fromTokenAddress,
						toToken: toTokenAddress,
						isCCIPLane,
						srcHash,
						dstHash,
						executionTime,
					}
				})
				break
				
			case Status.FAILED:
				trackEvent({ 
					...BridgeEvents.FAILED,
					data: {
						srcChainId: sourceChain?.id,
						dstChainId: destinationChain?.id,
						fromToken: fromTokenAddress,
						toToken: toTokenAddress,
						isCCIPLane,
					}
				})
				break
				
			case Status.REJECTED:
				trackEvent({ 
					...BridgeEvents.REJECTED,
					data: {
						srcChainId: sourceChain?.id,
						dstChainId: destinationChain?.id,
						fromToken: fromTokenAddress,
						toToken: toTokenAddress,
						isCCIPLane,
					}
				})
				break
				
			case Status.PENDING:
			case Status.NOT_STARTED:
			default:
				break
		}
	}, [txStatus, trackEvent, srcHash, dstHash, executionTime])

    useEffect(() => {
        trackBridgeEvent()
    }, [trackBridgeEvent])

    const currentStage = useMemo(() => {
        switch (txStatus) {
            case Status.SUCCESS:
                return 'success'
            case Status.FAILED:
                return 'failed'
            case Status.REJECTED:
                return 'rejected'
            case Status.PENDING:
                return 'pending'
            default:
                return 'not_started'
        }
    }, [txStatus])

    const currentStep = useMemo(() => {
        switch (true) {
            case steps.ALLOWANCE === Status.PENDING ||
                steps.ALLOWANCE === Status.REJECTED ||
                steps.ALLOWANCE === Status.FAILED:
                return StepType.ALLOWANCE
            case steps.BRIDGE === Status.PENDING || steps.BRIDGE === Status.REJECTED || steps.BRIDGE === Status.FAILED:
                return StepType.BRIDGE
            default:
                return null
        }
    }, [steps])

    const isTerminalStage = useMemo(() => {
        return ['success', 'failed', 'rejected'].includes(currentStage)
    }, [currentStage])

    return {
        txStatus,
        currentStage,
        currentStep,
        isTerminalStage,
        srcHash,
        dstHash,
        executionTime
    }
}