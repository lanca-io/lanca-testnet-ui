import type { FC } from 'react'
import { useHandleInput } from '@/hooks/useHandleInput'
import { useAccount } from 'wagmi'
import './AmountInput.pcss'

export const AmountInput: FC = () => {
	const { isConnected } = useAccount()
	const { value, onChange, onFocus, onBlur } = useHandleInput()

	return (
		<div className="amount-input">
			<input
				type="text"
				className="amount-input__input"
				placeholder="0"
				value={value}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				disabled={!isConnected}
			/>
		</div>
	)
}
