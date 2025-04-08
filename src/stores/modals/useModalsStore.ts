import { useContext } from 'react'
import { ModalsContext } from './ModalsContext'

export const useModalStore = () => {
	const useStore = useContext(ModalsContext)
	if (!useStore) {
		throw new Error(`You forgot to wrap your component in <ModalStoreProvider>.`)
	}

	const isSrcAssetModalOpen = useStore(state => state.isSrcAssetModalOpen)
	const isDstAssetModalOpen = useStore(state => state.isDstAssetModalOpen)
	const isFaucetModalOpen = useStore(state => state.isFaucetModalOpen)

	const openSrcAssetModal = useStore(state => state.openSrcAssetModal)
	const closeSrcAssetModal = useStore(state => state.closeSrcAssetModal)
	const openDstAssetModal = useStore(state => state.openDstAssetModal)
	const closeDstAssetModal = useStore(state => state.closeDstAssetModal)
	const openFaucetModal = useStore(state => state.openFaucetModal)
	const closeFaucetModal = useStore(state => state.closeFaucetModal)

	return {
		isSrcAssetModalOpen,
		isDstAssetModalOpen,
		openSrcAssetModal,
		closeSrcAssetModal,
		openDstAssetModal,
		closeDstAssetModal,
		isFaucetModalOpen,
		openFaucetModal,
		closeFaucetModal,
	}
}
