import type { FC } from 'react'

type TimeIconProps = {
    color?: string
}

export const TimeIcon: FC<TimeIconProps> = ({ color = '#84949B' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M8 14.4C11.5346 14.4 14.4 11.5346 14.4 8C14.4 4.46538 11.5346 1.6 8 1.6C4.46538 1.6 1.6 4.46538 1.6 8C1.6 11.5346 4.46538 14.4 8 14.4ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill={color}/>
            <rect x="6.3999" y="8" width="5.6" height="1.6" rx="0.8" fill={color}/>
            <rect x="8" y="4" width="5.6" height="1.6" rx="0.8" transform="rotate(90 8 4)" fill={color}/>
        </svg>
    )
}