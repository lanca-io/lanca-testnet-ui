import type { FC } from 'react'
import type { Chain } from '@/stores/chains/types'
import type { Address } from 'viem'
import { useCallback, useMemo, lazy, memo } from 'react'
import { ChainSelector } from '../../ChainSelector/ChainSelector'
import { useFormStore } from '@/stores/form/useFormStore'
import { AmountInput } from '../../AmountInput/AmountInput'
import { TokenAddresses } from '@/configuration/addresses'
import { BalanceDisplay } from '../../BalanceDisplay/BalanceDisplay'
import { ErrorDisplay } from '../../ErrorDisplay/ErrorDisplay'
import { useBalancesStore } from '@/stores/balances/useBalancesStore'
import { useModalStore } from '@/stores/modals/useModalsStore'
import './SourceCard.pcss'

const AssetModal = lazy(() =>
	import('../../AssetModal/AssetModal').then(module => ({
		default: module.AssetModal,
	})),
)

export const SourceCard: FC = memo((): JSX.Element => {
	const { sourceChain, setSourceChain, setFromTokenAddress, error } = useFormStore()
	const { balances, isLoading } = useBalancesStore()
	const { isSrcAssetModalOpen, openSrcAssetModal, closeSrcAssetModal } = useModalStore()

	const handleOpenModal = useCallback(() => {
		openSrcAssetModal()
	}, [openSrcAssetModal])

	const handleSelectChain = useCallback(
		(chain: Chain) => {
			setSourceChain(chain)
			const tokenAddress = TokenAddresses[chain.id]
			setFromTokenAddress(tokenAddress as Address)
			closeSrcAssetModal()
		},
		[setSourceChain, setFromTokenAddress, closeSrcAssetModal],
	)

	const token = useMemo(() => {
		if (!sourceChain || !balances[Number(sourceChain.id)]) {
			return { balance: '0', decimals: 18, symbol: 'tCERO' }
		}
		return balances[Number(sourceChain.id)]
	}, [sourceChain, balances])

	return (
		<div className="source_card_wrapper">
			<div className="source_card" data-testid="source-card">
				<ChainSelector chain={sourceChain} openModal={handleOpenModal} />
				<AmountInput />
				{error ? (
					<ErrorDisplay error={error} />
				) : (
					<BalanceDisplay balance={token.balance} isLoading={isLoading} showMax />
				)}
				<AssetModal
					isOpen={isSrcAssetModalOpen}
					title="Select From Chain"
					onClose={closeSrcAssetModal}
					onChainSelect={handleSelectChain}
					isSrcModal={true}
				/>
			</div>
		</div>
	)
})
