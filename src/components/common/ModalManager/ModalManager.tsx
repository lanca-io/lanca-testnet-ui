import { FC, memo } from 'react'
import { useModalStore } from '@/stores/modals/useModalsStore'
import { AssetModal } from '../AssetModal/AssetModal'
import { FaucetModal } from '../FaucetModal/FaucetModal'

export const ModalManager: FC = memo((): JSX.Element => {
	const {
		isSrcAssetModalOpen,
		isDstAssetModalOpen,
		isFaucetModalOpen,
		closeSrcAssetModal,
		closeDstAssetModal,
		closeFaucetModal,
	} = useModalStore()

    return (
        <>
            {isSrcAssetModalOpen && (
                <AssetModal
                    isOpen={isSrcAssetModalOpen}
                    title="Select From Chain"
                    onClose={closeSrcAssetModal}
                    isSrcModal={true}
                    direction='from'
                />
            )}

            {isDstAssetModalOpen && (
                <AssetModal
                    isOpen={isDstAssetModalOpen}
                    title="Select To Chain"
                    onClose={closeDstAssetModal}
                    isSrcModal={false}
                    direction='to'
                />
            )}

			{isFaucetModalOpen && (
				<FaucetModal title="Select Chain to Add Token" isOpen={isFaucetModalOpen} onClose={closeFaucetModal} />
			)}
		</>
	)
})
