import type { ChangeEvent, FocusEvent } from 'react'
import { useState, useCallback, useEffect, useRef } from 'react'
import { useFormStore } from '@/stores/form/useFormStore'

const TYPING_TIMEOUT = 700

export const useHandleInput = () => {
	const { fromAmount, setFromAmount } = useFormStore()
	// const { handleInputError } = useInputError()

	const [inputValue, setInputValue] = useState(fromAmount)
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (/^\d*\.?\d*$/.test(value)) {
			setInputValue(value)
		}
	}, [])

	const handleFocus = useCallback((e: FocusEvent<HTMLInputElement>) => {
		e.target.placeholder = ''
	}, [])

	const handleBlur = useCallback(
		(e: FocusEvent<HTMLInputElement>) => {
			if (!e.target.value) {
				setInputValue('')
				setFromAmount('')
			}
			e.target.placeholder = '0'
		},
		[setFromAmount],
	)

	useEffect(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}

		timeoutRef.current = setTimeout(() => {
			// handleInputError(inputValue)
			if (inputValue !== fromAmount) {
				setFromAmount(inputValue)
			}
		}, TYPING_TIMEOUT)

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [inputValue, fromAmount, setFromAmount])

	return {
		inputValue,
		handleChange,
		handleFocus,
		handleBlur,
	}
}
