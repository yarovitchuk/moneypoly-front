import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTransfer } from "../../components/context/TransferProvider/TransferProvider";
import { useUserContext } from "../../components/context/UserContext/UserContext";
import PlayerItem from "../../components/PlayerItem/PlayerItem";
import { getId, hideBackButton, initMainButton } from "../../service/telegramService";
import './Game.css';

const bankId = -1

const Game: React.FC = () => {
    const navigate = useNavigate()
    const { players } = useUserContext()
    const { toIds, setToIds } = useTransfer()
    const currentId = getId()

    useEffect(() => {
        hideBackButton()
        return initMainButton(() => navigate('/transfer'),
            toIds.length > 0, 'Продолжить')

    }, [navigate, toIds]);

    const toggleSelectPlayer = (playerId: number) => {
        const playerIds = toIds.includes(playerId)
            ? toIds.filter(id => id !== playerId)
            : [...toIds, playerId]

        setToIds(playerIds)
    };

    return <div className='game'>
        <PlayerItem isSelected={toIds.includes(bankId)}
                        accountValue={null}
                        profileName={'В банк'}
                        character={null}
                        onClick={() => toggleSelectPlayer(bankId)}
                    />

        {Object.values(players).length > 1 ? <div className="divider" /> : ''}

        {
            Object.values(players)
                .filter(({ id }) => id !== currentId)
                .map(({ id, name, character, balance }) =>
                    <PlayerItem
                        isSelected={toIds.includes(id)}
                        accountValue={balance}
                        profileName={name}
                        character={character}
                        onClick={() => toggleSelectPlayer(id)}
                    />
                )
        }
    </div>

}

export default Game;