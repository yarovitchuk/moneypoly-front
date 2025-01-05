import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoomCreation } from "../../components/context/RoomCreationProvider/RoomCreationProvider";
import { useUserContext } from "../../components/context/UserContext/UserContext";
import { Character, characterMap } from "../../enums/Character";
import { createRoom, deletePlayer, updateCharacter } from "../../service/apiService";
import {
    getId,
    getProfileName,
    hideMainButton,
    initBackButton,
    initMainButton,
    showMainButton
} from "../../service/telegramService";
import './CharacterSelection.css';

const CharacterSelection: React.FC = () => {
    const navigate = useNavigate();
    const { startSum, character, setCharacter, resetCharacter } = useRoomCreation()
    const { setBalance, setUserCharacter, roomId, setRoomId, players, setPlayers, isBanker, setIsBanker, outRoom } = useUserContext()

    const createRoomMutation = useMutation({
        mutationFn: (request: {
            adminId: number,
            adminName: string,
            startSum: number,
            adminCharacter: Character
        }) => createRoom(request),
        onSuccess: (resp) => {
            const userId = getId()
            const roomId = resp.data.roomId
            const player = resp.data.players[userId]
            setBalance(player.balance)
            setUserCharacter(player.character)
            setRoomId(roomId)
            setPlayers(resp.data.players)
            setIsBanker(true)
            navigate(`/success-creation/${roomId}`)
        }
    })

    const updateCharacterMutation = useMutation({
        mutationFn: (data: {
            roomId: number,
            userId: number,
            character: Character
        }) => updateCharacter(data.roomId, data.userId, data.character),
        onSuccess: (resp) => {
            const userId = getId()
            const player = resp.data.players[userId]
            setUserCharacter(player.character)
            navigate(`/game`)
        }
    })

    const deletePlayerMutation = useMutation({
        mutationFn: (request: { roomId: number, userId: number }) => deletePlayer(request.roomId, request.userId),
        onSuccess: () => {
            outRoom()
            navigate('/')
        }
    })

    useEffect(() => {
        initBackButton(
            () => {
                if (isBanker) {
                    navigate('/create-room')
                    return
                }

                deletePlayerMutation.mutate({ roomId: roomId!, userId: getId() })
            }
        )
        return initMainButton(() => {
            isBanker
                ?
                createRoomMutation.mutate({
                    adminId: getId(),
                    adminName: getProfileName(),
                    startSum: startSum,
                    adminCharacter: Character[character!]
                })
                :
                updateCharacterMutation.mutate({
                    roomId: roomId!,
                    userId: getId(),
                    character: character!,
                })
        }, character !== null, 'Продолжить')
    })

    const characters = [
        Character.DOG, Character.CAR,
        Character.SHIP, Character.GOOSE,
        Character.DINO, Character.HAT,
    ]

    const [selectedImage, setSelectedImage] = useState<Character | null>(null);

    const handleImageClick = (character: Character) => {
        if (selectedImage === character) {
            setSelectedImage(null);
            resetCharacter()
            hideMainButton()
            return;
        }
        setSelectedImage(character);
        setCharacter(character)
        showMainButton()
    };

    return (
        <div className="character-selection">
            <p className="character-selection__title">Выбор персонажа</p>
            <p className="character-selection__description">
                Выберите персонажа, изменить выбор вдальнейшем будет невозможно
            </p>

            <div className="image-grid">
                {characters.map((character, index) => (
                    <div
                        key={character}
                        className={`image-grid__item ${selectedImage === character ? 'selected' : ''} 
                            ${Object.values(players).map(({ character }) => character).includes(character) ? 'disabled' : ''}`}
                        onClick={() => handleImageClick(character)}
                    >
                        <img src={characterMap[character]!} alt={`Option ${index + 1}`} className="image-grid__img" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CharacterSelection;
