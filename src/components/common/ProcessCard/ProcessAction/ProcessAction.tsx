import type { FC } from 'react'
import { memo, useCallback } from 'react'
import { useTxExecutionStore } from '@/stores/tx-execution/useTxExecutionStore'
import { useTxProcess } from '@/hooks/useTxProcess'
import { Button } from '@concero/ui-kit'
import { Status } from '@lanca/sdk'
import './ProcessAction.pcss'

export const ProcessAction: FC = memo((): JSX.Element | null => {
    const { reset } = useTxExecutionStore()
    const { txStatus } = useTxProcess()
    
    const handleReset = useCallback(() => {
        reset()
    }, [reset])

    if (txStatus === Status.FAILED || txStatus === Status.REJECTED) {
        return (
            <div className={`process_action_${txStatus.toLowerCase()}`}>
                <div className="process_action">
                    <Button 
                        variant="secondary_color" 
                        size="l" 
                        isFull 
                        onClick={handleReset}
                        data-testid="try-again-button"
                    >
                        Try again
                    </Button>
                </div>
            </div>
        )
    }

    if (txStatus === Status.SUCCESS) {
        return (
            <div className={`process_action_${txStatus.toLowerCase()}`}>
                <div className="process_action">
                    <Button 
                        variant="secondary_color" 
                        size="l" 
                        isFull 
                        onClick={handleReset}
                        data-testid="swap-again-button"
                    >
                        Swap again
                    </Button>
                    <Button 
                        variant="secondary" 
                        size="l" 
                        isFull
                        data-testid="share-x-button"
                    >
                        Share on X
                    </Button>
                </div>
            </div>
        )
    }

    return null
})