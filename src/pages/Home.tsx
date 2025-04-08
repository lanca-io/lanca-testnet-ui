import type { FC } from 'react'
import { Hero } from '@/components/hero/Hero'
import { MetaTags } from '@/components/common/MetaTags/MetaTags'

export const HomePage: FC = (): JSX.Element => {
    const title = 'Concero | Testnet'
    const description = 'Description: Welcome to Concero Testnet – a risk-free, developer-focused blockchain sandbox for testing our fully decentralized cross-chain messaging solution featuring secure token swaps and seamless inter-chain communications.'

    return (
        <>
            <MetaTags title={title} description={description}/>
            <main>
                <Hero />
            </main>
        </>
    )
}