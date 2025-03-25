import type { FC } from 'react'
import { useMemo } from 'react'
import './Badge.pcss'

type BadgeProps = {
	logoURL: string | undefined
	size?: 'xs' | 's' | 'm' | 'l' | 'xl'
}

const placeholder =
	'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="gray"%3E%3Crect width="100%" height="100%"%3E%3C/rect%3E%3C/svg%3E'

export const Badge: FC<BadgeProps> = ({ logoURL, size = 'm' }) => {
	const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		e.currentTarget.src = placeholder
	}

	const badgeClassNames = useMemo(() => {
		return `badge__img badge__${size}`
	}, [size])

	return (
		<div className="badge">
			<img src={logoURL || placeholder} className={badgeClassNames} alt="Logo image" onError={handleImgError} />
		</div>
	)
}
