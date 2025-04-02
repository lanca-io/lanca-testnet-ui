import type { ChangeEvent, FocusEvent } from 'react'
import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { useFormStore } from '@/stores/form/useFormStore'
import { parseTokenAmount, formatTokenAmount } from '@/utils/tokens'
import { useDebounce } from './useDebounce'
import { useInputError } from './useInputError'

const NUM_REGEX = /^(\d*\.?\d*)?$/

export const useHandleInput = (decimals: number = 18) => {
	const [value, setValue] = useState<string>('')
	const [active, setActive] = useState<boolean>(false)

	const isFirst = useRef<boolean>(true)
	const prevValue = useRef<string>('')

	const { fromAmount, setFromAmount, setError } = useFormStore()
	const { validate } = useInputError()

	const lastFromAmount = useRef<string>(fromAmount)

	useEffect(() => {
		if (isFirst.current && fromAmount && fromAmount !== '0') {
			const readableVal = formatTokenAmount(fromAmount, decimals)
			setValue(readableVal)
			isFirst.current = false
			lastFromAmount.current = fromAmount
			return
		}

		if (fromAmount !== lastFromAmount.current) {
			if (fromAmount && fromAmount !== '0') {
				const readableVal = formatTokenAmount(fromAmount, decimals)
				setValue(readableVal)
				setActive(true)
			} else if (fromAmount === '0') {
				setValue('')
			}
			lastFromAmount.current = fromAmount
		}
	}, [fromAmount, decimals])

	const debounced = useDebounce<string>(value, 500)

	useEffect(() => {
		if (debounced !== prevValue.current) {
			prevValue.current = debounced

			if (!debounced) {
				setError(null)
				setFromAmount('0')
				return
			}

			if (active) {
				const rawVal = parseTokenAmount(debounced, decimals)

				const valid = validate(rawVal)
				if (valid) {
					setFromAmount(rawVal)
					lastFromAmount.current = rawVal
				}
			}
		}
	}, [debounced, setFromAmount, setError, decimals, validate, active])

	const onChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const val = e.target.value

			if (NUM_REGEX.test(val)) {
				if (!active) {
					setActive(true)
				}

				setValue(val)

				if (!val) {
					setError(null)
				}
			}
		},
		[active, setError],
	)

	const onFocus = useCallback((e: FocusEvent<HTMLInputElement>) => {
		e.target.placeholder = ''
	}, [])

	const onBlur = useCallback(
		(e: FocusEvent<HTMLInputElement>) => {
			if (!e.target.value) {
				setValue('')
				setFromAmount('0')
				setError(null)
			}
			e.target.placeholder = '0'
		},
		[setFromAmount, setError],
	)

	return useMemo(
		() => ({
			value,
			onChange,
			onFocus,
			onBlur,
			active,
		}),
		[value, onChange, onFocus, onBlur, active],
	)
}
