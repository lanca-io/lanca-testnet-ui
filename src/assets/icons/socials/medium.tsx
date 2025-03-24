import React from 'react'

interface MediumIconProps {
	color?: string
}

export const MediumIcon: React.FC<MediumIconProps> = ({ color = '#66767D' }) => {
	return (
		<svg
			className="social-icon"
			xmlns="http://www.w3.org/2000/svg"
			width="17"
			height="17"
			viewBox="0 0 17 17"
			fill="none"
		>
			<g clipPath="url(#clip0_44_3211)">
				<path
					d="M9.38392 8.38988C9.38392 11.4775 7.39518 13.9805 4.9419 13.9805C2.48859 13.9805 0.5 11.4782 0.5 8.38988C0.5 5.3016 2.48875 2.79944 4.9419 2.79944C7.39505 2.79944 9.38392 5.30233 9.38392 8.38988ZM14.2569 8.38988C14.2569 11.2964 13.2625 13.6525 12.0359 13.6525C10.8093 13.6525 9.81486 11.2957 9.81486 8.38988C9.81486 5.48409 10.8093 3.12732 12.0359 3.12732C13.2625 3.12732 14.2569 5.48409 14.2569 8.38988ZM16.25 8.38988C16.25 10.994 15.9002 13.1049 15.4688 13.1049C15.0375 13.1049 14.6877 10.9933 14.6877 8.38988C14.6877 5.78652 15.0375 3.67484 15.469 3.67484C15.9005 3.67484 16.25 5.78594 16.25 8.38988Z"
					fill={color}
				/>
			</g>
			<defs>
				<clipPath id="clip0_44_3211">
					<rect width="15.75" height="15.75" fill="white" transform="translate(0.5 0.5)" />
				</clipPath>
			</defs>
		</svg>
	)
}
