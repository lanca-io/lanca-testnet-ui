import type { FC } from 'react'
import { Button } from '@concero/ui-kit'
import { useEffect, useMemo } from 'react'
import { useAppKit } from '@reown/appkit/react'
import { useAccount } from 'wagmi'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/configuration/routes'

import FrameLeft from '@/assets/images/Welcome_Frame_6.png'
import FrameRight from '@/assets/images/Welcome_Frame_7.png'
import TabletBackgroungFrame from '@/assets/images/Welcome_tablet_frame_6.png'
import './Hero.pcss'

const Heading: FC = (): JSX.Element => {
	return <h1 className="heading">Welcome to Concero Testnet</h1>
}

const Subheading: FC = (): JSX.Element => {
	return (
		<p className="subheading">
			Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
			industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
			scrambled
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
			<img src={FrameLeft} alt="" className="illustration-one" />
			<img src={FrameRight} alt="" className="illustration-two" />
			<img src={TabletBackgroungFrame} alt="" className="illustration-tablet" />
		</div>
	)
}
