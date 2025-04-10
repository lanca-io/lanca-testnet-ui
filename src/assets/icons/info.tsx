import type { FC } from 'react'

type InfoIconProps = {
	color?: string
}

export const InfoIcon: FC<InfoIconProps> = ({ color = '#667085' }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7.9998 13.6C11.0926 13.6 13.5998 11.0928 13.5998 7.99999C13.5998 4.90719 11.0926 2.39999 7.9998 2.39999C4.90701 2.39999 2.3998 4.90719 2.3998 7.99999C2.3998 11.0928 4.90701 13.6 7.9998 13.6ZM7.9998 15.2C11.9763 15.2 15.1998 11.9764 15.1998 7.99999C15.1998 4.02354 11.9763 0.799988 7.9998 0.799988C4.02335 0.799988 0.799805 4.02354 0.799805 7.99999C0.799805 11.9764 4.02335 15.2 7.9998 15.2Z"
				fill={color}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M8.0002 7.20001C8.44202 7.20001 8.8002 7.55818 8.8002 8.00001V11.2C8.8002 11.6418 8.44202 12 8.0002 12C7.55837 12 7.2002 11.6418 7.2002 11.2V8.00001C7.2002 7.55818 7.55837 7.20001 8.0002 7.20001Z"
				fill={color}
			/>
			<circle cx="8.0002" cy="4.8" r="0.8" fill={color} />
		</svg>
	)
}
