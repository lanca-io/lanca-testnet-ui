import type { FC } from 'react'
import { Swap } from '@/components/swap/Swap'
import { MetaTags } from '@/components/common/MetaTags/MetaTags'

export const SwapPage: FC = (): JSX.Element => {
	const title = 'Concero | Testnet'
	const description =
		'Description: Welcome to Concero Testnet – a risk-free, developer-focused blockchain sandbox for testing our fully decentralized cross-chain messaging solution featuring secure token swaps and seamless inter-chain communications.'

	return (
		<>
			<MetaTags title={title} description={description} prefetchUrl='https://api.concero.io' />
			<main>
				<Swap />
			</main>
		</>
	)
}
