import type { FC } from 'react'
import { Swap } from '@/components/swap/Swap'
import { MetaTags } from '@/components/common/MetaTags/MetaTags'

export const SwapPage: FC = (): JSX.Element => {
    return (
        <>
            <MetaTags />
            <main>
                <Swap />
            </main>
        </>
    )
}