import './SkeletonLoader.pcss'

type SkeletonLoaderProps = {
	className?: string
	width?: number
	height: number
}

export function SkeletonLoader({ className, width, height }: SkeletonLoaderProps) {
	return <div style={{ width, height }} className={`skeleton ${className}`} />
}
