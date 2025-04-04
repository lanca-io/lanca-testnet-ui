import { memo } from 'react'
import './SkeletonLoader.pcss'

type SkeletonLoaderProps = {
	className?: string
	width?: number
	height: number
}

export const SkeletonLoader = memo(function SkeletonLoader({ className, width, height }: SkeletonLoaderProps) {
	return (
		<div
			style={{ width, height }}
			className={className ? `skeleton ${className}` : 'skeleton'}
			data-testid="skeleton-loader"
		/>
	)
})

SkeletonLoader.displayName = 'SkeletonLoader'
