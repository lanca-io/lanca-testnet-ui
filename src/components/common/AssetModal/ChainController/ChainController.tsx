import type { FC } from 'react'
import { memo, useCallback } from 'react'
import { Button } from '@concero/ui-kit'
import { useGetChains } from '@/hooks/useGetChains'
import { ActiveTab } from '../types'
import './ChainController.pcss'

type ChainControllerProps = {
    activeTab: ActiveTab
    setActiveTab: (tab: ActiveTab) => void
}

export const ChainController: FC<ChainControllerProps> = memo(({ activeTab, setActiveTab }): JSX.Element => {
    const { allChains, isLoading } = useGetChains()
    
    const handleAllTabClick = useCallback(() => {
        setActiveTab(ActiveTab.All)
    }, [setActiveTab])

    return (
        <div className="chain_controller">
            <Button
                isFull
                size="m"
                variant={activeTab === ActiveTab.All ? 'secondary_color' : 'secondary'}
                isLoading={isLoading}
                onClick={handleAllTabClick}
                data-testid="all-chains-tab"
            >
                All: {allChains.length - 1}
            </Button>
        </div>
    )
})
