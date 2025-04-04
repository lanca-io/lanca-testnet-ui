import { type IRouteType } from '@lanca/sdk'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'
import { useCallback } from 'react'

export const useExecutionListener = () => {
    const { setStepStatus } = useTxExecutionStore()

    return useCallback((state: IRouteType) => {
        if (!state?.steps?.length) return
        
        state.steps.forEach(step => {
            if (step.execution && step.execution.status) {
                setStepStatus(step.type, step.execution.status)
            }
        })
    }, [setStepStatus])
}