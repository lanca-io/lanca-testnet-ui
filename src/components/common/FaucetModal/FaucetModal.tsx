import type { FC } from 'react'
import type { Chain } from '@/stores/chains/types'
import { useState, useCallback, useEffect, memo } from 'react'
import { Modal } from '../Modal/Modal'
import { ChainFaucet } from './ChainFaucet/ChainFaucet'
import { useGetChains } from '@/hooks/useGetChains'
import { ErrorIcon } from '@/assets/icons/error'
import { Button, Spinner } from '@concero/ui-kit'
import { useFaucet } from '@/hooks/useFacuet'
import './FaucetModal.pcss'

type FaucetModalProps = {
    title: string
    isOpen: boolean
    onClose: () => void
}

const LoadingState = memo(() => (
    <div className='loading_state'>
        <div className='loading_state_content'>
            <Spinner type='gray'/>
            <p className='loading_state_text'>Adding token...</p>
        </div>
    </div>
))

const ErrorState = memo(() => (
    <div className='error_state'>
        <div className='error_state_content'>
            <ErrorIcon />
            <p className='error_state_text'>Error, please try again</p>
        </div>
    </div>
))

const ChainGrid = memo(({ chains, onChainClick }: { 
    chains: Array<Chain>, 
    onChainClick: (id: number) => void 
}) => (
    <div className='faucet_modal_grid'>
        {chains.map((chain) => (
            <ChainFaucet 
                key={chain.id} 
                name={chain?.name} 
                logoURI={chain.logoURL}
                onClick={() => onChainClick(Number(chain.id))}
            />
        ))}
    </div>
))

export const FaucetModal: FC<FaucetModalProps> = ({ title, isOpen, onClose }) => {
    const { faucetChains, isLoading: chainsLoading } = useGetChains()
    const { getTestTokens, isLoading: faucetLoading, error: faucetError } = useFaucet()
    const [lastChainId, setLastChainId] = useState<number | null>(null)
    const [showChainSelection, setShowChainSelection] = useState<boolean>(true)
    
    useEffect(() => {
        if (isOpen) {
            setShowChainSelection(true)
        }
    }, [isOpen])
    
    const handleChainClick = useCallback(async (id: number) => {
        setLastChainId(id)
        setShowChainSelection(false)
        const success = await getTestTokens(id)
        
        if (success) {
            onClose()
        }
    }, [getTestTokens, onClose])

    const handleRetry = useCallback(() => {
        if (lastChainId) {
            getTestTokens(lastChainId)
        }
    }, [lastChainId, getTestTokens])

    const handleModalClose = useCallback(() => {
        if (faucetError && !showChainSelection) {
            setShowChainSelection(true)
        } else {
            onClose()
        }
    }, [faucetError, onClose, showChainSelection])

    const handleBackdropClose = useCallback(() => {
        onClose()
    }, [onClose])

    const isLoading = chainsLoading || faucetLoading
    const error = faucetError && !showChainSelection

    return (
        <Modal 
            title={title} 
            isOpen={isOpen} 
            onClose={handleModalClose} 
            onBackdropClick={handleBackdropClose}
            className='faucet_modal'
        >
            {error ? (
                <>
                    <ErrorState />
                    <Button 
                        variant='secondary_color' 
                        size='l' 
                        isFull 
                        onClick={handleRetry} 
                        className='faucet_modal_button'
                    >
                        Try again
                    </Button>
                </>
            ) : isLoading ? (
                <LoadingState />
            ) : (
                <ChainGrid 
                    chains={faucetChains} 
                    onChainClick={handleChainClick} 
                />
            )}
        </Modal>
    )
}