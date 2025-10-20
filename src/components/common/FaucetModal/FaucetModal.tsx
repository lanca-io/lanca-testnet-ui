import type { FC } from 'react'
import type { Chain } from '@/stores/chains-old/types'
import { useState, useCallback, useEffect, memo } from 'react'
import { Modal } from '../Modal/Modal'
import { ChainFaucet } from './ChainFaucet/ChainFaucet'
import { useGetChains } from '@/hooks/useGetChains'
import { ErrorIcon } from '@/assets/icons/error'
import { Button, Spinner } from '@concero/ui-kit'
import { useFaucet } from '@/hooks/useFacuet'
import { useClaimedFaucets } from '@/hooks/useClaimedFaucets'
import './FaucetModal.pcss'

type FaucetModalProps = {
	title: string
	isOpen: boolean
	onClose: () => void
}

const LoadingView = memo(({ message }: { message: string }) => (
	<div className="loading_state">
		<div className="loading_state_content">
			<Spinner type="gray" />
			<p className="loading_state_text">{message}</p>
		</div>
	</div>
))

const ErrorView = memo(() => (
	<div className="error_state">
		<div className="error_state_content">
			<ErrorIcon />
			<p className="error_state_text">Error, please try again</p>
		</div>
	</div>
))

const ChainList = memo(
	({ chains, onSelect, claimed }: { chains: Array<Chain>; onSelect: (id: number) => void; claimed: number[] }) => (
		<div className="faucet_modal_grid">
			{chains.map(chain => {
				const id = Number(chain.id)
				const isClaimed = claimed.includes(id)
				const logoSrc = isClaimed && chain.disabledLogoURL ? chain.disabledLogoURL : chain.logoURL

				return (
					<ChainFaucet
						key={id}
						name={chain?.name}
						logoURI={logoSrc}
						onClick={() => onSelect(id)}
						isDisabled={isClaimed}
					/>
				)
			})}
		</div>
	),
)

export const FaucetModal: FC<FaucetModalProps> = ({ title, isOpen, onClose }) => {
	const { faucetChains, isLoading: loadingChains } = useGetChains()
	const { getTestTokens, isLoading: loadingFaucet, error: faucetError } = useFaucet()
	const { claimedChains, isLoading: loadingClaims, refetch } = useClaimedFaucets()
	const [selectedChain, setSelectedChain] = useState<number | null>(null)
	const [showSelection, setShowSelection] = useState<boolean>(true)

	useEffect(() => {
		if (isOpen) {
			refetch()
			setShowSelection(true)
		}
	}, [isOpen, refetch])

	const handleChainSelect = useCallback(
		async (id: number) => {
			if (claimedChains.includes(id)) return

			setSelectedChain(id)
			setShowSelection(false)
			const success = await getTestTokens(id)

			if (success) {
				await refetch()
				onClose()
			}
		},
		[getTestTokens, onClose, refetch, claimedChains],
	)

	const handleRetry = useCallback(() => {
		if (selectedChain) {
			getTestTokens(selectedChain)
		}
	}, [selectedChain, getTestTokens])

	const handleClose = useCallback(() => {
		if (faucetError && !showSelection) {
			setShowSelection(true)
		} else {
			onClose()
		}
	}, [faucetError, onClose, showSelection])

	const isLoading = loadingChains || loadingClaims || (loadingFaucet && !showSelection)
	const showError = faucetError && !showSelection

	return (
		<Modal title={title} isOpen={isOpen} onClose={handleClose} onBackdropClick={onClose} className="faucet_modal">
			{showError ? (
				<>
					<ErrorView />
					<Button
						variant="secondary_color"
						size="l"
						isFull
						onClick={handleRetry}
						className="faucet_modal_button"
					>
						Try again
					</Button>
				</>
			) : isLoading ? (
				<LoadingView message={loadingFaucet ? 'Adding token...' : 'Loading...'} />
			) : (
				<ChainList chains={faucetChains} onSelect={handleChainSelect} claimed={claimedChains} />
			)}
		</Modal>
	)
}
