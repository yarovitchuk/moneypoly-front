import { useMutation } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ReactComponent as PlusIcon } from '../../assets/plus.svg';
import { ReactComponent as ScanIcon } from '../../assets/scan.svg';
import { useUserContext } from '../../components/context/UserContext/UserContext';
import { addPlayer } from '../../service/apiService';
import { getId, getProfileName, hideButtons, parseRoomIdFromUrl, scanOnClick } from "../../service/telegramService";
import './ActionSelection.css';

const ActionSelection: React.FC = () => {
    let navigate = useNavigate();
    useEffect(() => hideButtons(), [])
    const { setRoomId, setBalance, setPlayers } = useUserContext()

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
            const player = resp.data.players[userId]
            setBalance(player.balance)
            setPlayers(resp.data.players)
            navigate('/select-character')
        },
    })

    return (
        <div className="action-selection">
            <p className="action-selection__title">Выберите действие</p>
            <p className="action-selection__description">
                Создайте новую игровую сессию или присоединитесь к существующей
            </p>

            <div className="action-selection__buttons">
                <button className="action-selection__button" onClick={() => navigate('/create-room')}>
                    Создать игру
                    <PlusIcon className="action-selection__icon" />
                </button>
                <button className="action-selection__button"
                    onClick={
                        scanOnClick((data) => {
                            const roomId = +parseRoomIdFromUrl(data)
                            setRoomId(roomId)

                            addPlayerMutation.mutate(
                                {
                                    roomId: roomId,
                                    request: {
                                        userId: getId(),
                                        name: getProfileName()
                                    }
                                }
                            )
                        })
                    }
                >
                    Присоединиться
                    <ScanIcon className="action-selection__icon" />
                </button>
            </div>
        </div>
    );
};

export default ActionSelection;
