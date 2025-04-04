import type { FC, ChangeEvent } from 'react'
import type { AssetModalProps } from './types'
import { useState, useCallback, memo } from 'react'
import { Modal } from '../Modal/Modal'
import { Input } from '@concero/ui-kit'
import { SearchIcon } from '@/assets/icons/search'
import { ChainController } from './ChainController/ChainController'
import { ChainMenu } from './ChainMenu/ChainMenu'
import { ActiveTab } from './types'
import './AssetModal.pcss'

export const AssetModal: FC<AssetModalProps> = memo(({ title, isOpen, onClose, onChainSelect }): JSX.Element => {
    const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.All)
    const [searchInput, setSearchInput] = useState<string>('')

    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value)
    }, [])

    const handleTabChange = useCallback((tab: ActiveTab) => {
        setActiveTab(tab)
    }, [])

    return (
        <Modal title={title} isOpen={isOpen} onClose={onClose}>
            <Input
                placeholder="Select chain"
                size="l"
                icon={<SearchIcon />}
                value={searchInput}
                classNameWrap="input_wrap"
                onChange={handleSearchChange}
                data-testid="chain-search-input"
            />
            <ChainController activeTab={activeTab} setActiveTab={handleTabChange} />
            <ChainMenu 
                activeTab={activeTab} 
                searchInput={searchInput} 
                onSelectChain={onChainSelect} 
            />
            <div className="gradient_blur" />
        </Modal>
    )
})
