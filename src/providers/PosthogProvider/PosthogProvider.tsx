import type { FC, PropsWithChildren } from 'react'
import type { PostHogConfig } from 'posthog-js'
import { posthog_domain, posthog_key } from '@/configuration/constants'
import { PostHogProvider as PHProvider } from 'posthog-js/react'

export const PosthogProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	const options: Partial<PostHogConfig> = {
		api_host: posthog_domain,
		autocapture: false,
		disable_session_recording: true
	}

	return (
		<PHProvider apiKey={posthog_key} options={options}>
			{children}
		</PHProvider>
	)
}
