import { useCallback } from 'react'
import { usePostHog } from 'posthog-js/react'

type TrackEventProps<T = Record<string, any>> = {
  category: string
  action: string
  label?: string
  data?: T
}

function useTrackEvent() {
  const posthog = usePostHog()

  const trackEvent = useCallback(
    ({ category, action, label, data }: TrackEventProps) => {
      try {
        posthog.capture(action, {
          label,
          category,
          ...data,
        })
      } catch (error) {
        console.error('trackEvent error', error)
      }
    },
    [posthog]
  )

  return trackEvent
}

export default useTrackEvent