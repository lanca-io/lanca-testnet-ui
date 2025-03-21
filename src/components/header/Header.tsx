import type { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { routes } from '../../configuration/routes'
import './Header.pcss'

const HomeHeader: FC = (): JSX.Element => {
	return (
		<header className="home-header">
			<img src="/Header/ConceroLogo.svg" alt="Concero" />
		</header>
	)
}

const SwapHeader: FC = (): JSX.Element => {
	return (
		<header className="swap-header">
			<img src="/Header/ConceroLogo.svg" alt="Concero" />
		</header>
	)
}

export const Header: FC = (): JSX.Element => {
	const location = useLocation()

	return (
		<>
			{location.pathname === routes.home && <HomeHeader />}
			{location.pathname === routes.swap && <SwapHeader />}
		</>
	)
}
