import type { FC } from 'react'

type AddIconProps = {
	color?: string
}

export const AddIcon: FC<AddIconProps> = ({ color = '#7E54F1' }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
			<g clipPath="url(#clip0_84_3825)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M8 0C8.47338 0 8.85714 0.383756 8.85714 0.857143V15.1429C8.85714 15.6162 8.47338 16 8 16C7.52661 16 7.14285 15.6162 7.14285 15.1429V0.857143C7.14285 0.383756 7.52661 0 8 0Z"
					fill={color}
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M0 8.00003C0 7.52664 0.383756 7.14288 0.857143 7.14288H15.1429C15.6162 7.14288 16 7.52664 16 8.00003C16 8.47341 15.6162 8.85717 15.1429 8.85717H0.857143C0.383756 8.85717 0 8.47341 0 8.00003Z"
					fill={color}
				/>
			</g>
			<defs>
				<clipPath id="clip0_84_3825">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	)
}
