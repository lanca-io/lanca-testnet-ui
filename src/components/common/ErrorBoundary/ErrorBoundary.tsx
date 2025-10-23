import { memo, type FC } from 'react'
import './ErrorBoundary.pcss'

export const ErrorBoundary: FC = memo((): JSX.Element => {
	return (
		<div className="error_boundary_wrapper">
			<div className="error_boundary_card">
				<h3 className="error_boundary_card_title">We will be back up and running shortly.</h3>
				<p className="error_boundary_card_description">
					Our infrastructure is currently undergoing maintenance to improve your experience. Thank you for
					your patience!
				</p>
			</div>
		</div>
	)
})

ErrorBoundary.displayName = 'ErrorBoundary'
