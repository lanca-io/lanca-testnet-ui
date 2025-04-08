import { useState, useEffect, useRef } from 'react'

export const useDebounce = <T>(value: T, delay: number = 500): T => {
	const initialValue = useRef(true)
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	useEffect(() => {
		if (initialValue.current) {
			initialValue.current = false
			setDebouncedValue(value)
			return
		}

		const timer = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => {
			clearTimeout(timer)
		}
	}, [value, delay])

	return debouncedValue
}
