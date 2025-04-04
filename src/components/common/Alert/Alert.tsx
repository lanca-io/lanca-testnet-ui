import { FC, type ReactNode, memo } from 'react'
import './Alert.pcss'

type Variant = 'neutral' | 'info' | 'success' | 'error' | 'warning'

type AlertProps = {
    icon?: ReactNode
    title: string
    subtitle?: string
    variant?: Variant
}

export const Alert: FC<AlertProps> = memo(({ icon, title, subtitle, variant = 'info' }) => {
    const alertClass = `alert alert_${variant}`
    
    return (
        <div className={alertClass}>
            <div className="alert_icon">{icon}</div>
            <div className="alert_content">
                <h3 className="alert_title">{title}</h3>
                {subtitle && <p className="alert_subtitle">{subtitle}</p>}
            </div>
        </div>
    )
})