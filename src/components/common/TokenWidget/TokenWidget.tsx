import { FC, useMemo, memo } from 'react'
import { IconButton } from '@concero/ui-kit'
import { TokenIcon } from '@/assets/icons/token'
import { AddIcon } from '@/assets/icons/add'
import { useBalancesStore } from '@/stores/balances/useBalancesStore'
import { useFormStore } from '@/stores/form/useFormStore'
import { useModalStore } from '@/stores/modals/useModalsStore'
import { useAccount } from 'wagmi'
import { formatTokenAmount } from '@/utils/tokens'
import { SkeletonLoader } from '../SkeletonLoader/SkeletonLoader'
import { format } from '@/utils/format'
import './TokenWidget.pcss'

const COLORS = {
    PURPLE: 'var(--color-accent-600)',
    GRAY: 'var(--color-gray-600)',
}

export const TokenWidget: FC = memo(() => {
    const { isConnected } = useAccount()
    const { sourceChain } = useFormStore()
    const { balances, isLoading } = useBalancesStore()
    const { openFaucetModal } = useModalStore()

    const rawAmount = useMemo(() => {
        if (!sourceChain || !balances[Number(sourceChain.id)]) {
            return '0'
        }
        return balances[Number(sourceChain.id)].balance
    }, [sourceChain, balances])

    const nativeToken = useMemo(
        () => formatTokenAmount(rawAmount, sourceChain?.decimals || 18),
        [rawAmount, sourceChain?.decimals],
    )

    const uiProps = useMemo<{
        tokenColor: string
        addColor: string
        buttonVariant: 'secondary' | 'secondary_color'
    }>(() => {
        const hasToken = !isLoading && Number(nativeToken) > 0

        return {
            tokenColor: hasToken || isLoading ? COLORS.PURPLE : COLORS.GRAY,
            addColor: hasToken || isLoading ? COLORS.GRAY : COLORS.PURPLE,
            buttonVariant: hasToken ? 'secondary' : ('secondary_color' as const),
        }
    }, [nativeToken, isLoading])

    if (!isConnected) {
        return null
    }

    return (
        <div className="token_widget">
            <TokenIcon color={uiProps.tokenColor} />
            {isLoading ? (
                <SkeletonLoader width={28} height={22} className="loader" />
            ) : (
                <h5 className="native_token_value">{format(Number(nativeToken), 2)}</h5>
            )}

            <IconButton 
                size="s" 
                variant={uiProps.buttonVariant} 
                onClick={openFaucetModal}
            >
                <AddIcon color={uiProps.addColor} />
            </IconButton>
        </div>
    )
})