import { FC, useMemo, memo } from 'react'
import { useLocation } from 'react-router-dom'
import { GasWidget } from '../common/GasWidget/GasWidget'
import { WalletButton } from '../common/WalletButton/WalletButton'
import { routes } from '../../configuration/routes'
import { useIsMobile } from '@/hooks/useMediaQuery'
import './Header.pcss'

type LogoProps = {
	isMobile?: boolean
}

const Logo: FC<LogoProps> = memo(({ isMobile }) => {
	const logoSrc = isMobile ? '/Header/ShortConceroLogo.svg' : '/Header/ConceroLogo.svg'
	return <img src={logoSrc} alt="Concero" className="header__logo" />
})

export const Header: FC = () => {
	const { pathname } = useLocation()
	const isMobile = useIsMobile()

	const headerMap = useMemo(
		() => ({
			[routes.home]: (
				<header className="home-header">
					<Logo />
				</header>
			),
			[routes.swap]: (
				<header className="swap-header">
					<Logo isMobile={isMobile} />
					<div className="swap-header__actions">
						{!isMobile && <GasWidget />}
						<WalletButton />
					</div>
				</header>
			),
		}),
		[isMobile],
	)

	return headerMap[pathname] || null
}
