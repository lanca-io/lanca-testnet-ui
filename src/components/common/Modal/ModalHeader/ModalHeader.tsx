import { FC, useCallback } from 'react'
import { IconButton } from '@concero/ui-kit'
import { LeftIcon } from '@/assets/icons/left'
import "./ModalHeader.pcss"

type ModalHeaderProps = {
    title: string
    onClose: () => void
}

export const ModalHeader: FC<ModalHeaderProps> = ({ title, onClose }) => {
    const handleClose = useCallback(() => {
        onClose()
    }, [onClose])

    return (
        <div className="modal-header">
            <IconButton onClick={handleClose} variant="secondary" size="m">
                <LeftIcon />
            </IconButton>
            <h4 className="modal-header__title">{title}</h4>
        </div>
    )
}