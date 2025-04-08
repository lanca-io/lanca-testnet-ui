import { FC } from 'react'
import { Modal } from '../Modal/Modal'
import { Chain } from './ChainItem/Chain'
import { useGetChains } from '@/hooks/useGetChains'
import './FaucetModal.pcss'

type FaucetModalProps = {
    title: string
    isOpen: boolean
    onClose: () => void
}

export const FaucetModal: FC<FaucetModalProps> = ({ title, isOpen, onClose }) => {
    const { faucetChains } = useGetChains()

    return (
        <Modal title={title} isOpen={isOpen} onClose={onClose} className='faucet_modal'>
            <div className='faucet_modal_grid'>
                {faucetChains.map((chain) => (
                    <Chain key={chain.id} name={chain?.name} logoURI={chain.logoURL} />
                ))}
            </div>
        </Modal>
    )
}