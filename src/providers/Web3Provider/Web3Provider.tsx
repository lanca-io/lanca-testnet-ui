import type { FC, PropsWithChildren } from 'react'
import { Suspense, useMemo } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider } from '@tanstack/react-query'
import { QueryConfiguration } from '@/configuration/query'
import { createDynamicWagmiConfig } from '@/hooks/useCreateWagmiConfig'
import { chainResource } from '@/utils/resource'
import { ScreenLoader } from '@/components/common/ScreenLoader/ScreenLoader'

export const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
    const chains = chainResource.read()
    const config = useMemo(() => createDynamicWagmiConfig(chains), [chains])

    return (
        <Suspense fallback={<ScreenLoader />}>
            <WagmiProvider config={config}>
                <QueryClientProvider client={QueryConfiguration}>
                    {children}
                </QueryClientProvider>
            </WagmiProvider>
        </Suspense>
    )
}
