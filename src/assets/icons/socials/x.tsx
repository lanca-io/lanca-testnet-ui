import type { FC } from 'react'

type XIconProps = {
	color?: string
}

export const XIcon: FC<XIconProps> = ({ color = '#66767D' }) => {
	return (
		<svg
			className="social-icon"
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 14 14"
			fill="none"
		>
			<path
				d="M11.026 0H13.1727L8.48285 5.93059L14 14H9.67983L6.29632 9.10628L2.42427 14H0.276362L5.29249 7.65716L0 0H4.42953L7.48794 4.47358L11.026 0ZM10.2724 12.5785H11.4622L3.78349 1.3472H2.50688L10.2724 12.5785Z"
				fill={color}
			/>
		</svg>
	)
}
