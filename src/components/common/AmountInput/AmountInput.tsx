import type { FC } from 'react';
import { useHandleInput } from '@/hooks/useHandleInput';
import { useFormStore } from '@/stores/form/useFormStore';
import './AmountInput.pcss';

export const AmountInput: FC = () => {
    const { inputValue, handleChange, handleFocus, handleBlur } = useHandleInput();

    return (
        <div className="amount-input">
            <input
                type="text"
                className="amount-input__input"
                placeholder="0"
                value={inputValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </div>
    );
};