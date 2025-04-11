export type Direction = 'to' | 'from'

export type AssetModalProps = {
	title: string
	isOpen: boolean
	isSrcModal: boolean
	onClose: () => void
	className?: string
	direction: Direction
}

export enum ActiveTab {
	All = 'all',
	CCIP = 'ccip',
}
