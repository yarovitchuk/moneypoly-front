import React from "react";
import './Balance.css';
import {ReactComponent as Infinity} from "../../assets/infinity.svg";
import {ReactComponent as Currency} from "../../assets/currency.svg";

interface BalanceState {
    balanceValue: number | null
}

const Balance: React.FC<BalanceState> = ({balanceValue}) => {
    let balance;
    if (balanceValue === null) {
        balance =
            <div className='balance-infinity'>
                <Infinity width={30} height={19}/>
            </div>
    } else {
        balance = <div>{balanceValue}</div>
    }

    return (
        <div className='balance'>
            {balance}
            <div className='balance-currency'>
                <Currency width={26} height={17}/>
            </div>
        </div>
    )
}

export default Balance;