import type { FC, ChangeEvent } from 'react'
import type { AssetModalProps } from './types'
import type { ConceroChain } from '@/stores/chains/types'
import type { Address } from 'viem'
import { useState, useCallback, memo } from 'react'
import { Modal } from '../Modal/Modal'
import { Input } from '@concero/ui-kit'
import { SearchIcon } from '@/assets/icons/search'
import { ChainMenu } from './ChainMenu/ChainMenu'
import { Button } from '@concero/ui-kit'
import { ActiveTab } from './types'
import { useModalStore } from '@/stores/modals/useModalsStore'
import { useChainsStore } from '@/stores/chains/useChainsStore'
import { useFormStore } from '@/stores/form/useFormStore'
import './AssetModal.pcss'

export const AssetModal: FC<AssetModalProps> = memo(
	({ title, isOpen, isSrcModal, direction, onClose }): JSX.Element => {
		const { chains } = useChainsStore()
		const { isFaucetModalOpen, openFaucetModal } = useModalStore()
		const { setSourceChain, setDestinationChain, setFromTokenAddress, setToTokenAddress } = useFormStore()
		const [activeTab,] = useState<ActiveTab>(ActiveTab.All)
		const [searchInput, setSearchInput] = useState<string>('')

		const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
			setSearchInput(event.target.value)
		}, [])

		const handleChainSelect = useCallback(
			(chain: ConceroChain) => {
				if (isSrcModal) {
					setSourceChain(chain)
					const tokenAddress = chains[chain.id]?.contracts.usdc_e
					setFromTokenAddress(tokenAddress as Address)
				} else {
					setDestinationChain(chain)
					const tokenAddress = chains[chain.id]?.contracts.usdc_e
					setToTokenAddress(tokenAddress as Address)
				}
				onClose()
			},
			[isSrcModal, setSourceChain, setDestinationChain, setFromTokenAddress, setToTokenAddress, onClose],
		)

		return (
			<Modal
				title={title}
				isOpen={isOpen}
				onClose={onClose}
				backdropClassName={isFaucetModalOpen ? 'faucet_open' : ''}
			>
				<Input
					placeholder="Select chain"
					size="l"
					icon={<SearchIcon />}
					value={searchInput}
					classNameWrap="input_wrap"
					onChange={handleSearchChange}
					data-testid="chain-search-input"
				/>
				<ChainMenu
					activeTab={activeTab}
					searchInput={searchInput}
					onSelectChain={handleChainSelect}
					direction={direction}
				/>
				<div className={isSrcModal ? 'gradient_blur_button' : 'gradient_blur'} />

				{isSrcModal && (
					<Button
						size="l"
						variant="secondary_color"
						isFull
						onClick={openFaucetModal}
						data-testid="add-tokens-button"
					>
						Add Tokens
					</Button>
				)}
			</Modal>
		)
	},
)
