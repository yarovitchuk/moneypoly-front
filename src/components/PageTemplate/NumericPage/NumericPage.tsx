import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as Currency } from "../../../assets/currency-black.svg";
import './NumericPage.css'

interface PageStates extends React.PropsWithChildren {
    title: string,
    description?: string,
    startSum?: number;
    onChange?: (sum: number) => void
}

const NumericPage: React.FC<PageStates> = ({ title, description, onChange, startSum, children }) => {
    const [amount, setAmount] = useState<string>(`${startSum ?? ''}`);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setAmount(value);
            if (onChange) onChange(+value)
        }
    };

    useEffect(() => {
        setTimeout(() => inputRef.current?.setSelectionRange(amount.length, amount.length), 1000)
    }, [])

    let descriptionDiv = <div className='numeric-page-no-description' />;
    if (description) {
        descriptionDiv =
            <p className='numeric-page-description'>
                {description}
            </p>
    }

    return (
        <div className='numeric-page'>
            <p className='numeric-page-tile'>{title}</p>
            {descriptionDiv}

            <div className='numeric-page-input-container'>
                <input
                    ref={inputRef}
                    type="text"
                    inputMode="numeric"
                    min='0'
                    pattern='\d*'
                    className='numeric-page-input'
                    value={amount}
                    onChange={handleInputChange}
                />
                <Currency className='numeric-page-currency' />
            </div>

            {children}
        </div>
    )
}

export default NumericPage;