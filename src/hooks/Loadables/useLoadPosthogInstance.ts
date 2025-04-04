import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { usePostHog } from 'posthog-js/react'

export const useLoadPosthogInstance = (): void => {
	const { address } = useAccount()
	const posthog = usePostHog()

	useEffect(() => {
		if (!address || !posthog) return
		posthog.identify(address)
	}, [address, posthog])
}
