import type { FC, PropsWithChildren } from 'react'
import { ModalHeader } from './ModalHeader/ModalHeader'
import { createPortal } from 'react-dom'
import "./Modal.pcss"

type ModalProps = {
	isOpen: boolean
	title: string
	onClose: () => void
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({ isOpen, title, onClose, children }) => {
    if (!isOpen) return null
    
    return createPortal(
        <div className="backdrop">
            <div className="modal">
                <ModalHeader title={title} onClose={onClose}/>
                {children}
            </div>
        </div>,
        document.body
    )
}
