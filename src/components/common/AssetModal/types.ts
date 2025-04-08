export type AssetModalProps = {
	title: string
	isOpen: boolean
	isSrcModal: boolean
	onClose: () => void
	className?: string
}

export enum ActiveTab {
	All = 'all',
	CCIP = 'ccip',
}
