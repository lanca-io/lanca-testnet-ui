import type { FC } from 'react'
import { Button } from '@concero/ui-kit'
import { useMemo } from 'react'
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
	const heading = useMemo(() => <Heading />, [])
	const subheading = useMemo(() => <Subheading />, [])

	return (
		<div className="hero">
			<div className="hero-content">
				{heading}
				{subheading}
			</div>
			<Button size="l" variant="primary" className="action-button">
				Connect wallet
			</Button>
		</div>
	)
}
