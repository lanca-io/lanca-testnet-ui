import type { FC } from 'react'

type GasIconProps = {
	color?: string
	size?: number
}

export const GasIcon: FC<GasIconProps> = ({ color = '#66767D', size = 18 }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 18 18" fill="none">
			<rect y="16.2" width="14.4" height="1.8" rx="0.9" fill={color} />
			<rect
				x="9.89999"
				y="5.40002"
				width="5.4"
				height="1.8"
				rx="0.9"
				transform="rotate(-180 9.89999 5.40002)"
				fill={color}
			/>
			<rect
				x="8.10001"
				y="9"
				width="5.4"
				height="1.8"
				rx="0.899999"
				transform="rotate(-90 8.10001 9)"
				fill={color}
			/>
			<rect x="4.5" y="9" width="5.4" height="1.8" rx="0.9" transform="rotate(-90 4.5 9)" fill={color} />
			<rect x="9.89999" y="9" width="5.4" height="1.8" rx="0.9" transform="rotate(-180 9.89999 9)" fill={color} />
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M3.59999 1.8C3.10294 1.8 2.69999 2.20294 2.69999 2.7V17.1C2.69999 17.5971 2.29705 18 1.79999 18C1.30294 18 0.899994 17.5971 0.899994 17.1V2.7C0.899994 1.20883 2.10883 0 3.59999 0H10.8C12.2912 0 13.5 1.20883 13.5 2.7V17.1C13.5 17.5971 13.097 18 12.6 18C12.1029 18 11.7 17.5971 11.7 17.1V2.7C11.7 2.20294 11.297 1.8 10.8 1.8H3.59999Z"
				fill={color}
			/>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M17.3386 0.032198C17.8179 0.163996 18.0996 0.659359 17.9678 1.13862L17.01 4.62148V11.7C17.01 13.1912 15.8012 14.4 14.31 14.4H12.6C12.1029 14.4 11.7 13.997 11.7 13.5C11.7 13.0029 12.1029 12.6 12.6 12.6H14.31C14.8071 12.6 15.21 12.197 15.21 11.7V4.49998C15.21 4.41935 15.2208 4.33909 15.2422 4.26134L16.2322 0.661342C16.364 0.182078 16.8594 -0.0995998 17.3386 0.032198Z"
				fill={color}
			/>
		</svg>
	)
}
