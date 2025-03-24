import type { FC } from 'react'

interface WalletIconProps {
	color?: string
}

export const WalletIcon: FC<WalletIconProps> = ({ color = '#66767D' }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M2.4 1.6C1.95817 1.6 1.6 1.95817 1.6 2.4C1.6 2.84183 1.95817 3.2 2.4 3.2H12.8V2.4C12.8 1.95817 12.4418 1.6 12 1.6H2.4ZM14.4 3.2V2.4C14.4 1.07452 13.3255 0 12 0H2.4C1.07452 0 0 1.07452 0 2.4V13.6C0 14.9255 1.07452 16 2.4 16H13.6C14.9255 16 16 14.9255 16 13.6V4C16 3.55817 15.6418 3.2 15.2 3.2H14.4ZM14.4 4.8H2.4C2.11949 4.8 1.85022 4.75188 1.6 4.66344V13.6C1.6 14.0418 1.95817 14.4 2.4 14.4H13.6C14.0418 14.4 14.4 14.0418 14.4 13.6V4.8Z"
				fill={color}
			/>
			<path
				d="M12.8 9.6C12.8 10.0418 12.4418 10.4 12 10.4C11.5581 10.4 11.2 10.0418 11.2 9.6C11.2 9.15818 11.5581 8.8 12 8.8C12.4418 8.8 12.8 9.15818 12.8 9.6Z"
				fill={color}
			/>
		</svg>
	)
}
