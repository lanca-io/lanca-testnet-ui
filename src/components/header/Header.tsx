import { FC, useMemo, memo } from 'react'
import { useLocation } from 'react-router-dom'
import { GasWidget } from '../common/GasWidget/GasWidget'
import { WalletButton } from '../common/WalletButton/WalletButton'
import { routes } from '../../configuration/routes'
import { useIsMobile } from '@/hooks/useMediaQuery'
import Concero_logo_short from '@/assets/icons/concero_logo_short.svg'
import './Header.pcss'
import { isAdminAddress } from '@/utils/tests/isAdminAddress'
import { useAccount } from 'wagmi'

type LogoProps = {
	isMobile?: boolean
}

const Logo: FC<LogoProps> = memo(({ isMobile }) => {
	//TODO: Fix these paths
	const logoSrc = isMobile ? Concero_logo_short : '/Header/ConceroLogo.svg'
	return <img src={logoSrc} alt="Concero" className="header__logo" />
})

export const Header: FC = () => {
	const { pathname } = useLocation()
	const isMobile = useIsMobile()
	const { address } = useAccount()
	const isWhitelisted = isAdminAddress(address)

	const headerMap = useMemo(
		() => ({
			[routes.home]: (
				<header className="home-header">
					<Logo />
				</header>
			),
			[routes.swap]: isWhitelisted ? (
				<header className="swap-header">
					<Logo isMobile={isMobile} />
					<div className="swap-header__actions">
						{!isMobile && <GasWidget />}
						<WalletButton />
					</div>
				</header>
			) : (
				<header className=" home-header header-not-whitelist">
					<Logo />
				</header>
			),
		}),
		[isMobile, isWhitelisted],
	)

	return headerMap[pathname] || null
}
