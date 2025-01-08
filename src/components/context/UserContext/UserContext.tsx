import { useMutation, useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { Character } from "../../../enums/Character";
import { Player } from "../../../models/Room";
import { addPlayer, auth, getRoomByUserId } from "../../../service/apiService";
import { getId, getProfileName } from "../../../service/telegramService";


interface UserContextType {
    balance: number | null
    setBalance: (balance: number | null) => void
    name: string
    setName: (name: string) => void
    character: Character | null
    setUserCharacter: (character: Character | null) => void
    isBanker: boolean;
    setIsBanker: (isBanker: boolean) => void
    roomId: number | null
    setRoomId: (roomId: number | null) => void
    players: { [key: number]: Player }
    setPlayers: (players: { [key: number]: Player }) => void
    outRoom: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUserContext = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider')
    }
    return context
}

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [balance, setBalance] = useState<number | null>(null)
    const [name, setName] = useState<string>(getProfileName())
    const [isBanker, setIsBanker] = useState<boolean>(false)
    const [character, setUserCharacter] = useState<Character | null>(null)
    const [roomId, setRoomId] = useState<number | null>(null)
    const [players, setPlayers] = useState<{ [key: number]: Player }>({})
    const userId = getId();

    const [isConnected, setIsConnected] = useState(false);
    const [isStarted, setIsStared] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    useQuery({
        queryKey: ["auth"],
        queryFn: () => auth(Telegram.WebApp.initData)
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false)),
        retry: 3,
        retryDelay: 2000
    })
    const navigate = useNavigate()
    const { isLoading } = useQuery(
        {
            queryKey: ['room-by-user'],
            queryFn: () => getRoomByUserId(userId)
                .then((resp) => {
                    const data = resp?.data
                    if (data) {
                        const currentPlayer = data.players[userId]
                        setRoomId(data.roomId)
                        setBalance(currentPlayer.balance)
                        setPlayers(data.players)
                        setIsBanker(data.adminId === userId)
                        if (!currentPlayer.character) {
                            navigate('/select-character')
                            return
                        }
                        setUserCharacter(currentPlayer.character)
                        data.adminId === userId ? navigate(`/banker-game`) : navigate(`/game`)
                    } else {
                        navigate('/')
                    }
                }),
            retry: 3,
        },
    )

    const addPlayerMutation = useMutation({
        mutationFn: (data: {
            roomId: number,
            request: {
                userId: number,
                name: string
            }
        }) => addPlayer(data.roomId, data.request),
        onSuccess(resp) {
            const userId = getId()
            const players = resp?.data.players!
            setIsStared(true)
            setBalance(players[userId].balance)
            setPlayers(players)
            navigate('/select-character')
        },
        retry: false,
    })

    useEffect(() => {
        if (isStarted) return

        const startedRoomId = Telegram.WebApp.initDataUnsafe.start_param
        if (!startedRoomId) {
            setIsStared(true)
            return
        }
        const numericRoomId = +startedRoomId
        setRoomId(numericRoomId)
        addPlayerMutation.mutate({
            roomId: numericRoomId,
            request: {
                userId: getId(),
                name: getProfileName()
            }
        })
    }, [isStarted])

    useWebSocket(`/api/users/${userId}/ws`, {
        onMessage: (event) => {
            const room = JSON.parse(event.data) as {
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
            };
            setPlayers(room.players);
            setBalance(room.players[userId]?.balance || null);
            const isNewBanker = room.adminId === getId() && !isBanker
            if (isNewBanker) {
                setIsBanker(true)
                navigate('/banker-game')
            }
        },
        onOpen: () => setIsConnected(true),
        onClose: () => setIsConnected(false),
        onError: () => setIsConnected(false),
        shouldReconnect: () => true,
        reconnectAttempts: 10,
        reconnectInterval: 1000,
    })

    const outRoom = () => {
        setBalance(null)
        setUserCharacter(null)
        setPlayers({})
        setIsBanker(false)
        setRoomId(null)
    }

    return isLoading || !isConnected || !isAuthenticated ? <span>Loading...</span>
        :
        <UserContext.Provider value={{
            balance, setBalance,
            name, setName,
            character, setUserCharacter,
            isBanker, setIsBanker,
            roomId, setRoomId,
            players, setPlayers,
            outRoom
        }}>
            {children}
        </UserContext.Provider>
}