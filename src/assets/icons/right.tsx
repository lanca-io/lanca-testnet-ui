import type { FC } from 'react'

type RightIconProps = {
	color?: string
}

export const RightIcon: FC<RightIconProps> = ({ color = '#66767D' }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M6.23431 12.4323C5.9219 12.1199 5.9219 11.6134 6.23431 11.301L9.66863 7.86666L6.23431 4.43235C5.9219 4.11993 5.9219 3.6134 6.23431 3.30098C6.54673 2.98856 7.05327 2.98856 7.36569 3.30098L11.3657 7.30098C11.6781 7.6134 11.6781 8.11993 11.3657 8.43235L7.36569 12.4323C7.05327 12.7448 6.54673 12.7448 6.23431 12.4323Z"
				fill={color}
			/>
		</svg>
	)
}
