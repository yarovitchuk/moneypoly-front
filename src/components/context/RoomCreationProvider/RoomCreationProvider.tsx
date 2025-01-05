import {Character} from "../../../enums/Character";
import React, {createContext, useContext, useState} from "react";

interface RoomCreationContextType {
    startSum: number;
    setStartSum: (sum: number) => void;
    resetStartSum: () => void;
    character: Character | null;
    setCharacter: (character: Character) => void;
    resetCharacter: () => void;
}

const RoomCreationContext = createContext<RoomCreationContextType | undefined>(undefined)

export const useRoomCreation = () => {
    const context = useContext(RoomCreationContext)
    if (!context) {
        throw new Error('useRoomCreation must be used within a RoomCreationProvider')
    }
    return context
}

export const RoomCreationProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [startSum, setStartSum] = useState<number>(1000)
    const [character, setCharacter] = useState<Character | null>(null)

    const resetStartSum = () => setStartSum(1000)
    const resetCharacter = () => setCharacter(null)

    return (
        <RoomCreationContext.Provider value={{
            startSum, setStartSum, resetStartSum,
            character, setCharacter, resetCharacter,
        }}>
            {children}
        </RoomCreationContext.Provider>
    )
}