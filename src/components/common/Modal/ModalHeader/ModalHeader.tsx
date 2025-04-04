import { FC, useCallback, memo } from 'react'
import { IconButton } from '@concero/ui-kit'
import { LeftIcon } from '@/assets/icons/left'
import './ModalHeader.pcss'

type ModalHeaderProps = {
	title: string
	onClose: () => void
}

export const ModalHeader: FC<ModalHeaderProps> = memo(({ title, onClose }) => {
	const handleClose = useCallback(() => {
		onClose()
	}, [onClose])

	return (
		<div className="modal_header">
			<IconButton onClick={handleClose} variant="secondary" size="m" aria-label="Close modal">
				<LeftIcon />
			</IconButton>
			<h4 className="modal_header_title">{title}</h4>
		</div>
	)
})

ModalHeader.displayName = 'ModalHeader'
