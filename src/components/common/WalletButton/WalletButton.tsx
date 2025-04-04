import type { FC } from 'react'
import type { TButtonVariant } from '@concero/ui-kit'
import { useMemo, useCallback, memo } from 'react'
import { useAppKit } from '@reown/appkit/react'
import { useAccount } from 'wagmi'
import { Button } from '@concero/ui-kit'
import { WalletIcon } from '@/assets/icons/wallet'
import { RightIcon } from '@/assets/icons/right'

export const WalletButton: FC = memo(() => {
	const { address, isConnected, isConnecting } = useAccount()
	const { open } = useAppKit()

	const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
		event => {
			event.preventDefault()
			open()
		},
		[open],
	)

	const buttonConfig = useMemo(() => {
		const formattedAddress = isConnected && address ? `${address.slice(0, 4)}...${address.slice(-4)}` : address

		return {
			text: isConnected ? formattedAddress : isConnecting ? 'Connecting...' : 'Connect Wallet',
			variant: isConnected ? 'secondary' : ('secondary_color' as TButtonVariant),
			leftIcon: isConnected ? <WalletIcon /> : undefined,
			rightIcon: isConnected ? <RightIcon /> : undefined,
		}
	}, [address, isConnected, isConnecting])

	return (
		<Button
			variant={buttonConfig.variant}
			leftIcon={buttonConfig.leftIcon}
			rightIcon={buttonConfig.rightIcon}
			onClick={handleClick}
			isDisabled={isConnecting}
			aria-busy={isConnecting}
			isLoading={isConnecting}
			data-testid="wallet-button"
		>
			{buttonConfig.text}
		</Button>
	)
})
