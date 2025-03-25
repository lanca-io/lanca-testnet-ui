import type { FC, ChangeEvent, FocusEvent } from 'react'
import { useCallback } from 'react'
import { useFormStore } from '@/stores/form/useFormStore'
import "./AmountInput.pcss"

export const AmountInput: FC = () => {
    const { fromAmount, setFromAmount } = useFormStore()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        // Allow only numbers and a single dot, and prevent dot before a number
        if (/^\d*\.?\d*$/.test(newValue) && !/^\.|.*\..*\./.test(newValue)) {
            setFromAmount(newValue)
        }
    }

    const handleFocus = useCallback((e: FocusEvent<HTMLInputElement>) => {
        if (e.target.placeholder === '0') {
            e.target.placeholder = ''
        }
    }, [])

    const handleBlur = useCallback(
        (e: FocusEvent<HTMLInputElement>) => {
            if (!e.target.value) {
                e.target.placeholder = '0'
            }
        },
        [],
    )
    return (
        <div className="amount-input">
            <input
                type="text"
                className="amount-input__input"
                placeholder="0"
                value={fromAmount}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </div>
    )
}