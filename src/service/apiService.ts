import axios from "axios";
import { Character } from "../enums/Character";
import { Room } from "../models/Room";

export const instance = axios.create()

export const getRoomByUserId = async (userId: number) => instance.get<
    {
        roomId: number,
        adminId: number,
        players: {
            [key: number]: {
                id: number,
                name: string,
                balance: number,
                character: Character,
            }
        }
    }
>(`/api/rooms/by-user/${userId}`)
    .catch(error => {
        if (error.response.status === 404) {
            console.log('handled 404')
            return null
        }
    })

export const addPlayer = async (roomId: number, request: { userId: number, name: string }) => instance.post<Room>(
    `/api/rooms/${roomId}/add`, request
)

export const deletePlayer = async (roomId: number, userId: number) => instance.delete(`/api/rooms/${roomId}/delete/${userId}`)

export const transfer = async (roomId: number, request: {
    fromId: number,
    toIds: number[],
    amount: number
}) => instance.post<Room>(`/api/rooms/${roomId}/transfer`, request)

export const createRoom = async (
    request: {
        adminId: number,
        adminName: string,
        startSum: number,
        adminCharacter: Character
    }
) => instance.post<Room>('/api/rooms/create', request)

export const updateCharacter = async (
    roomId: number,
    userId: number,
    character: Character,
) => instance.patch<Room>(`/api/rooms/${roomId}/players/${userId}`, { character: character })

export const auth = async (
    initData: string
) => instance.post('/api/auth', { initData: initData })