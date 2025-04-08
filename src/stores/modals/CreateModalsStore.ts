import type { ModalsState, ModalsStore } from './types'
import { createWithEqualityFn } from 'zustand/traditional'

const initialState = {
	isSrcAssetModalOpen: false,
	isDstAssetModalOpen: false,
	isFaucetModalOpen: false,
}

export const CreateModalStore = (): ModalsStore => {
	return createWithEqualityFn<ModalsState>(
		set => ({
			...initialState,

			openSrcAssetModal: () =>
				set(() => ({
					isSrcAssetModalOpen: true,
					isDstAssetModalOpen: false,
				})),

			closeSrcAssetModal: () =>
				set(() => ({
					isSrcAssetModalOpen: false,
				})),

			openDstAssetModal: () =>
				set(() => ({
					isDstAssetModalOpen: true,
					isSrcAssetModalOpen: false,
				})),

			closeDstAssetModal: () =>
				set(() => ({
					isDstAssetModalOpen: false,
				})),

			openFaucetModal: () =>
				set(() => ({
					isFaucetModalOpen: true,
				})),

			closeFaucetModal: () =>
				set(() => ({
					isFaucetModalOpen: false,
				})),
		}),
		Object.is,
	)
}
