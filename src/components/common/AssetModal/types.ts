import type { Chain } from '@/stores/chains/types'

export type AssetModalProps = {
	title: string
	isOpen: boolean
	isSrcModal: boolean
	onClose: () => void
	onChainSelect: (chain: Chain) => void
}

export enum ActiveTab {
	All = 'all',
	CCIP = 'ccip',
}
