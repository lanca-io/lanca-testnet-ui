import { FC, type ReactNode } from 'react'
import './Alert.pcss'

type Variant = 'neutral' | 'info' | 'success' | 'error' | 'warning'

type AlertProps = {
	icon?: ReactNode
	title: string
	subtitle?: string
	variant?: Variant
}

export const Alert: FC<AlertProps> = ({ icon, title, subtitle, variant = 'info' }) => {
	return (
		<div className={`alert alert--${variant}`}>
			<div className="alert__icon">{icon}</div>
			<div className="alert__content">
				<h3 className="alert__title">{title}</h3>
				{subtitle && <p className="alert__subtitle">{subtitle}</p>}
			</div>
		</div>
	)
}
