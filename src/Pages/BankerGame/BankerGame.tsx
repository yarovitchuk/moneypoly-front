import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTransfer } from "../../components/context/TransferProvider/TransferProvider";
import { useUserContext } from "../../components/context/UserContext/UserContext";
import PlayerItem from "../../components/PlayerItem/PlayerItem";
import { getId, hideBackButton, initMainButton } from "../../service/telegramService";
import './BankerGame.css';

const bankId = -1

const BankerGame: React.FC = () => {
    const [isBank, setIsBank] = useState(false);
    const { players } = useUserContext()
    const { setFromId, toIds, setToIds } = useTransfer()
    const navigate = useNavigate()

    const currentId = getId()

    useEffect(() => {
        hideBackButton()
        return initMainButton(() => navigate('/transfer'), toIds.length > 0, 'Продолжить')
    })

    const toggleSelectPlayer = (playerId: number) => {
        const playerIds = toIds.includes(playerId)
            ? toIds.filter(id => id !== playerId)
            : [...toIds, playerId]

        setToIds(playerIds)
    };

    const handleToggle = () => {
        const tempIsBank = !isBank
        setIsBank(tempIsBank);

        const fromId = tempIsBank ? bankId : currentId
        setFromId(fromId)

        const playerIds = toIds.filter(id => id !== currentId && id !== bankId)
        setToIds(playerIds)
    };

    return (
        <div className='banker-game'>
            <div className="vertical-toggle">
                <div
                    className={`toggle-button ${isBank ? 'right' : 'left'}`}
                    onClick={handleToggle}
                >
                    {isBank ? 'Из банка' : 'Из кошелька'}
                </div>
                <div className="toggle-labels" onClick={handleToggle}>
                    <span>Из кошелька</span>
                    <span>Из банка</span>
                </div>
            </div>

            {
                isBank ?
                    <PlayerItem isSelected={toIds.includes(currentId)}
                        accountValue={players[currentId].balance ?? null}
                        profileName={'Cебе'}
                        character={players[currentId].character ?? null}
                        onClick={() => toggleSelectPlayer(currentId)}
                    />
                    :
                    <PlayerItem isSelected={toIds.includes(bankId)}
                        accountValue={null}
                        profileName={'В банк'}
                        character={null}
                        onClick={() => toggleSelectPlayer(bankId)}
                    />
            }

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
    )
}

export default BankerGame;
