import type { FC, ChangeEvent } from 'react'
import type { AssetModalProps } from './types'
import { useState, useCallback, memo, lazy } from 'react'
import { Modal } from '../Modal/Modal'
import { Input } from '@concero/ui-kit'
import { SearchIcon } from '@/assets/icons/search'
import { ChainController } from './ChainController/ChainController'
import { ChainMenu } from './ChainMenu/ChainMenu'
import { Button } from '@concero/ui-kit'
import { ActiveTab } from './types'
import { useModalStore } from '@/stores/modals/useModalsStore'
import './AssetModal.pcss'

const FaucetModal = lazy(() =>
    import('../FaucetModal/FaucetModal').then(module => ({
        default: module.FaucetModal,
    }))
)

export const AssetModal: FC<AssetModalProps> = memo(
    ({ title, isOpen, isSrcModal, onClose, onChainSelect }): JSX.Element => {
        const { isFaucetModalOpen, openFaucetModal, closeFaucetModal } = useModalStore()
        const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.All)
        const [searchInput, setSearchInput] = useState<string>('')

        const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
            setSearchInput(event.target.value)
        }, [])

        const handleTabChange = useCallback((tab: ActiveTab) => {
            setActiveTab(tab)
        }, [])

        return (
            <>
                <Modal
                    title={title}
                    isOpen={isOpen}
                    onClose={onClose}
                    className={isFaucetModalOpen ? 'faucet_open' : ''}
                >
                    <Input
                        placeholder="Select chain"
                        size="l"
                        icon={<SearchIcon />}
                        value={searchInput}
                        classNameWrap="input_wrap"
                        onChange={handleSearchChange}
                        data-testid="chain-search-input"
                    />

                    {!isSrcModal && <ChainController activeTab={activeTab} setActiveTab={handleTabChange} />}
                    <ChainMenu activeTab={activeTab} searchInput={searchInput} onSelectChain={onChainSelect} />
                    <div className={isSrcModal ? 'gradient_blur_button' : 'gradient_blur'} />

                    {isSrcModal && (
                        <Button
                            size="l"
                            variant="secondary_color"
                            isFull
                            onClick={openFaucetModal}
                            data-testid="add-tokens-button"
                        >
                            Add Tokens
                        </Button>
                    )}
                </Modal>

                {isFaucetModalOpen && isSrcModal && (
                    <FaucetModal 
                        title="Get Test Tokens" 
                        isOpen={isFaucetModalOpen} 
                        onClose={closeFaucetModal} 
                    />
                )}
            </>
        )
    }
)