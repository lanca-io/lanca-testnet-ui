import { FC, useMemo, memo } from 'react'
import { useLocation } from 'react-router-dom'
import { GasWidget } from '../common/GasWidget/GasWidget'
import { WalletButton } from '../common/WalletButton/WalletButton'
import { routes } from '../../configuration/routes'
import { useIsDesktop, useIsMobile } from '@/hooks/useMediaQuery'
import { TokenWidget } from '../common/TokenWidget/TokenWidget'
import './Header.pcss'

import Concero_logo_short from '@/assets/icons/concero_logo_short.svg'
import { useIsWhitelisted } from '@/hooks/useIsWhitelisted'

type LogoProps = {
	isMobile?: boolean
}

const Logo: FC<LogoProps> = memo(({ isMobile }) => {
	const logoSrc = isMobile ? Concero_logo_short : '/Header/ConceroLogo.svg'
	return <img src={logoSrc} alt="Concero" className="header__logo" />
})

export const Header: FC = () => {
	const { pathname } = useLocation()
	const { isWhitelisted, isLoading } = useIsWhitelisted()


	const isMobile = useIsMobile()
	const isDesktop = useIsDesktop()
	const isWidgetVisible = !isDesktop && !isLoading && isWhitelisted

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
						{isWidgetVisible && <TokenWidget />}
						{isWidgetVisible && <GasWidget />}
						<WalletButton />
					</div>
				</header>
			) : (
				<header className=" home-header header-not-whitelist">
					<Logo />
				</header>
			),
		}),
		[isMobile, isWhitelisted, isDesktop],
	)

	return headerMap[pathname] || null
}
