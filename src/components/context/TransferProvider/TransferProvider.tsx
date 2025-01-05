import React, {createContext, useContext, useState} from "react";
import { getId } from "../../../service/telegramService";


interface TransferProviderContextType {
    fromId: number | null;
    setFromId: (fromId: number) => void;
    resetFromId: () => void;
    toIds: number[];
    setToIds: (ids: number[]) => void;
    resetToIds: () => void;
    amount: number | null;
    setAmount: (amount: number) => void;
    resetAmount: () => void;
    renewContext: () => void;
}

const TransferContext = createContext<TransferProviderContextType | undefined>(undefined)

export const useTransfer = () => {
    const context = useContext(TransferContext)
    if (!context) {
        throw new Error('useTransfer must be used within a TransferProvider')
    }

    return context
}

export const TransferProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [fromId, setFromId] = useState<number | null>(getId())
    const [toIds, setToIds] = useState<number[]>([] as number[])
    const [amount, setAmount] = useState<number | null>(null)

    const resetFromId = () => setFromId(getId())
    const resetToIds = () => setToIds([])
    const resetAmount = () => setAmount(null)
    const renewContext = () => {
        resetFromId()
        resetToIds()
        resetAmount()
    }

    return (
        <TransferContext.Provider value={{
            fromId, setFromId, resetFromId,
            toIds, setToIds, resetToIds,
            amount, setAmount, resetAmount,
            renewContext
        }}>
            {children}
        </TransferContext.Provider>
    )
}