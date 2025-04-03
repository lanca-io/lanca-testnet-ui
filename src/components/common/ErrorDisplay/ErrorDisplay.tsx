import type { FC } from 'react'
import { useAccount } from 'wagmi'
import './ErrorDisplay.pcss'

type ErrorDisplayProps = {
	error: string | null
}

export const ErrorDisplay: FC<ErrorDisplayProps> = ({ error }): JSX.Element | null => {
	const { isConnected } = useAccount()

	if (!error || !isConnected) return null

	return (
		<div className="error-display">
			<span className="error-display__title">{error}</span>
		</div>
	)
}
