import type { FC } from 'react'
import { useAccount } from 'wagmi'
import { memo } from 'react'
import './ErrorDisplay.pcss'

type ErrorDisplayProps = {
    error: string | null
}

export const ErrorDisplay: FC<ErrorDisplayProps> = memo(({ error }): JSX.Element | null => {
    const { isConnected } = useAccount()

    if (!error || !isConnected) return null

    return (
        <div className="error_display">
            <span className="error_display_title">{error}</span>
        </div>
    )
})