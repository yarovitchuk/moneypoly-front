import { Character } from "../enums/Character"

export interface Room {
    roomId: number,
    adminId: number,
    players: {
        [key: number]: Player
    }
}

export interface Player {
    id: number,
    name: string,
    balance: number,
    character: Character | null,
}