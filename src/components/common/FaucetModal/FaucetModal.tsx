import { FC } from 'react'
import { Modal } from '../Modal/Modal'
import './FaucetModal.pcss'

type FaucetModalProps = {
	title: string
	isOpen: boolean
	onClose: () => void
}

export const FaucetModal: FC<FaucetModalProps> = ({ isOpen, onClose }) => {
	return (
		<Modal title="Faucet" isOpen={isOpen} onClose={onClose}>
			Bamba
		</Modal>
	)
}
