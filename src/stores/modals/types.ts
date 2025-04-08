import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand/vanilla'

export interface ModalsState {
	isSrcAssetModalOpen: boolean
	isDstAssetModalOpen: boolean
	isFaucetModalOpen: boolean

	openSrcAssetModal: () => void
	closeSrcAssetModal: () => void

	openDstAssetModal: () => void
	closeDstAssetModal: () => void

	openFaucetModal: () => void
	closeFaucetModal: () => void
}

export type ModalsStore = UseBoundStoreWithEqualityFn<StoreApi<ModalsState>>
