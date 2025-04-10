import type { FC, PropsWithChildren, MouseEvent } from 'react'
import { memo, useCallback } from 'react'
import { ModalHeader } from './ModalHeader/ModalHeader'
import { createPortal } from 'react-dom'
import './Modal.pcss'

type ModalProps = {
    isOpen: boolean
    title: string
    onClose: () => void
    onBackdropClick?: () => void 
    className?: string
    backdropClassName?: string
}

export const Modal: FC<PropsWithChildren<ModalProps>> = memo(
    ({ isOpen, title, onClose, onBackdropClick, children, className = '', backdropClassName = '' }) => {
    if (!isOpen) return null

    const handleBackdropClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            if (onBackdropClick) {
                onBackdropClick()
            } else {
                onClose()
            }
        }
    }, [onClose, onBackdropClick])

    return createPortal(
        <div className={`backdrop ${backdropClassName}`} onClick={handleBackdropClick}>
            <div className={`modal ${className}`}>
                <ModalHeader title={title} onClose={onClose} />
                {children}
            </div>
        </div>,
        document.body,
    )
})

Modal.displayName = 'Modal'