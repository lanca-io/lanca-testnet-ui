import type { FC } from 'react'
import { Hero } from '@/components/hero/Hero'
import { MetaTags } from '@/components/common/MetaTags/MetaTags'

export const HomePage: FC = (): JSX.Element => {
    return (
        <>
            <MetaTags />
            <main>
                <Hero />
            </main>
        </>
    )
}