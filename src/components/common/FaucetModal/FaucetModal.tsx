import { FC, useState, useCallback } from 'react'
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

const LoadingState: FC = (): JSX.Element => {
    return (
        <div className='loading_state'>
            <div className='loading_state_content'>
                <Spinner type='gray'/>
                <p className='loading_state_text'>Adding token...</p>
            </div>
        </div>
    )
}

const ErrorState: FC = (): JSX.Element => {
    return (
        <div className='error_state'>
            <div className='error_state_content'>
                <ErrorIcon />
                <p className='error_state_text'>Error, please try again</p>
            </div>
        </div>
    )
}


export const FaucetModal: FC<FaucetModalProps> = ({ title, isOpen, onClose }) => {
    const { faucetChains, isLoading: chainsLoading } = useGetChains()
    const { getTestTokens, isLoading: faucetLoading, error: faucetError } = useFaucet()
    const [lastChainId, setLastChainId] = useState<number | null>(null)
    
    const handleChainClick = useCallback(async (id: number) => {
        setLastChainId(id)
        await getTestTokens(id)
    }, [getTestTokens])

    const handleRetry = useCallback(async () => {
        if (lastChainId) {
            await getTestTokens(lastChainId)
        }
    }, [lastChainId, getTestTokens])

    const isLoading = chainsLoading || faucetLoading || false;
    const error = faucetError || false;

    return (
        <Modal title={title} isOpen={isOpen} onClose={onClose} className='faucet_modal'>
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
                <div className='faucet_modal_grid'>
                    {faucetChains.map((chain) => (
                        <ChainFaucet 
                            key={chain.id} 
                            name={chain?.name} 
                            logoURI={chain.logoURL}
                            onClick={() => handleChainClick(Number(chain.id))}
                        />
                    ))}
                </div>
            )}
        </Modal>
    )
}