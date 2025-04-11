import type { FC } from 'react'
import { Button } from '@concero/ui-kit'
import { useEffect, useMemo } from 'react'
import { useAppKit } from '@reown/appkit/react'
import { useAccount } from 'wagmi'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/configuration/routes'
import './Hero.pcss'

const Heading: FC = (): JSX.Element => {
	return <h1 className="heading">Welcome to Concero Testnet</h1>
}

const Subheading: FC = (): JSX.Element => {
	return (
		<p className="subheading">
			We offer developers and early adopters a risk-free space to test our fully decentralized cross-chain
			messaging solution, including token swaps and inter-chain communications
		</p>
	)
}

export const Hero: FC = () => {
	const { open } = useAppKit()
	const { isConnected } = useAccount()

	const navigate = useNavigate()
	const heading = useMemo(() => <Heading />, [])
	const subheading = useMemo(() => <Subheading />, [])

	useEffect(() => {
		if (isConnected) {
			navigate(routes.swap, { replace: true })
		}
	}, [isConnected])

	return (
		<div className="hero">
			<div className="hero-content">
				{heading}
				{subheading}
			</div>
			<Button
				size="l"
				variant="primary"
				className="action-button"
				onClick={event => {
					event.preventDefault()
					open()
				}}
			>
				Connect wallet
			</Button>
			<img src={'/Hero/Welcome_Frame_6.webp'} alt="" className="illustration-one" />
			<img src={'/Hero/Welcome_Frame_7.webp'} alt="" className="illustration-two" />
			<img src={'/Hero/Welcome_tablet_frame_6.webp'} alt="" className="illustration-tablet" />
		</div>
	)
}
