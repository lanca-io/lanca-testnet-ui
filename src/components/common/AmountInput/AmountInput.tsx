import type { FC } from 'react'
import { memo, useMemo } from 'react'
import { useHandleInput } from '@/hooks/useHandleInput'
import { useAccount } from 'wagmi'
import './AmountInput.pcss'

export const AmountInput: FC = memo(() => {
    const { isConnected } = useAccount()
    const { value, onChange, onFocus, onBlur } = useHandleInput()
    
    const containerClass = useMemo(() => 
        isConnected ? 'amount_input' : 'amount_input amount_input_disabled', 
    [isConnected])

    return (
        <div className={containerClass}>
            <input
                type="text"
                className="amount_input_input"
                placeholder="0"
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                disabled={!isConnected}
                aria-label="Amount input"
                inputMode="decimal"
                autoComplete="off"
            />
        </div>
    )
})