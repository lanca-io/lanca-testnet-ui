import type { FC, PropsWithChildren } from 'react'
import type { PostHogConfig } from 'posthog-js'
import { posthog_domain, posthog_key } from '@/configuration/constants'
import { PostHogProvider } from 'posthog-js/react'

export const PosthogProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const options: Partial<PostHogConfig> = {
        api_host: posthog_domain
    }

    return (
        <PostHogProvider apiKey={posthog_key} options={options}>
            {children}
        </PostHogProvider>
    )
}
