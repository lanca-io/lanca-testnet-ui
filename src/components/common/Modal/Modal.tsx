import type { FC, PropsWithChildren } from 'react'
import { memo } from 'react'
import { ModalHeader } from './ModalHeader/ModalHeader'
import { createPortal } from 'react-dom'
import './Modal.pcss'

type ModalProps = {
    isOpen: boolean
    title: string
    onClose: () => void
    className?: string
    backdropClassName?: string
}

export const Modal: FC<PropsWithChildren<ModalProps>> = memo(
    ({ isOpen, title, onClose, children, className = '', backdropClassName = '' }) => {
    if (!isOpen) return null

    return createPortal(
        <div className={`backdrop ${backdropClassName}`}>
            <div className={`modal ${className}`}>
                <ModalHeader title={title} onClose={onClose} />
                {children}
            </div>
        </div>,
        document.body,
    )
})