import type { FC } from 'react'
import type { Address } from 'viem'
import type { Chain } from '@/stores/chains/types'
import { useState, useCallback, useMemo } from 'react'
import { ChainSelector } from '../../ChainSelector/ChainSelector'
import { useFormStore } from '@/stores/form/useFormStore'
import { AmountInput } from '../../AmountInput/AmountInput'
import { AssetModal } from '../../AssetModal/AssetModal'
import { TokenAddresses } from '@/configuration/addresses'
import { BalanceDisplay } from '../../BalanceDisplay/BalanceDisplay'
import { useBalancesStore } from '@/stores/balances/useBalancesStore'
import './SourceCard.pcss'

export const SourceCard: FC = (): JSX.Element => {
    const { sourceChain, setSourceChain, setFromTokenAddress, setFromAmount } = useFormStore()
    const { balances, isLoading } = useBalancesStore()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const openModal = useCallback(() => {
        setIsModalOpen(true)
    }, [])

    const closeModal = useCallback(() => {
        setIsModalOpen(false)
    }, [])

    const handleSelectChain = useCallback((chain: Chain) => {
        setSourceChain(chain)
        const tokenAddress = TokenAddresses[chain.id]
        setFromTokenAddress(tokenAddress as Address)
        closeModal()
    }, [setSourceChain, closeModal])

    const token = useMemo(() => {
        if (!sourceChain || !balances[Number(sourceChain.id)]) {
            return { balance: '0', decimals: 18, symbol: 'tCERO' }
        }
        return balances[Number(sourceChain.id)]
    }, [sourceChain, balances])

    return (
        <div className="source-card-wrapper">
            <div className="source-card">
                <ChainSelector chain={sourceChain} openModal={openModal} />
                <AmountInput />
                <BalanceDisplay 
                    balance={token.balance} 
                    isLoading={isLoading} 
                    showMax 
                />
                <AssetModal
                    isOpen={isModalOpen}
                    title="Select Chain"
                    onClose={closeModal}
                    onChainSelect={handleSelectChain}
                />
            </div>
        </div>
    )
}