import type { FC } from 'react'

type YouTubeIconProps = {
	color?: string
}

export const YouTubeIcon: FC<YouTubeIconProps> = ({ color = '#66767D' }) => {
	return (
		<svg
			className="social-icon"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="17"
			viewBox="0 0 24 17"
			fill="none"
		>
			<path
				d="M19.0155 0H4.98449C2.23163 0 0 2.23386 0 4.98948V12.0105C0 14.7661 2.23163 17 4.98449 17H19.0155C21.7684 17 24 14.7661 24 12.0105V4.98948C24 2.23386 21.7684 0 19.0155 0ZM15.6445 8.8416L9.08177 11.9748C8.9069 12.0583 8.7049 11.9306 8.7049 11.7367V5.27454C8.7049 5.07786 8.91221 4.9504 9.08744 5.0393L15.6502 8.36831C15.8453 8.46727 15.8419 8.74738 15.6445 8.8416Z"
				fill={color}
			/>
		</svg>
	)
}
