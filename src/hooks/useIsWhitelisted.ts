import { useState, useEffect, useCallback } from 'react'
import { useAccount } from 'wagmi'
import { usePostHog } from 'posthog-js/react'

export const useIsWhitelisted = () => {
    const { address, isConnected } = useAccount()
    const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const posthog = usePostHog()

    const checkWhitelistStatus = useCallback(() => {
        setIsWhitelisted(false)

        if (!isConnected || !address) {
            setIsLoading(false)
            return
        }

        setIsLoading(true)

        try {
            const isEnabled = posthog.isFeatureEnabled('concero-testnet-whitelist')
            setIsWhitelisted(!!isEnabled)
        } catch (err) {
            setIsWhitelisted(false)
            console.warn('Whitelist check failed:', err)
        } finally {
            setIsLoading(false)
        }
    }, [posthog, address, isConnected])

    useEffect(() => {
        if (!posthog || !isConnected || !address) {
            setIsWhitelisted(false)
            setIsLoading(false)
            return
        }

        posthog.onFeatureFlags(() => {
            checkWhitelistStatus()
        })
    }, [address, isConnected, posthog, checkWhitelistStatus])

    return {
        isWhitelisted,
        isLoading,
    }
}