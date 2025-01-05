import './PlayerItem.css'
import { Character, characterMap } from '../../enums/Character';
import BankCharacter from '../../assets/currency.svg'
import React from "react";
import Balance from "../Balance/Balance";

interface PlayerInfo {
    accountValue: number | null;
    profileName: string;
    character: Character | null;
    isSelected: boolean
    onClick: () => void;
}

const PlayerItem: React.FC<PlayerInfo> = ({ accountValue, profileName, character, isSelected, onClick }) => {
    return (
        <div className={`player-item ${isSelected ? 'selected' : ''}`} onClick={onClick}>
            <Balance balanceValue={accountValue} />
            <div className='player-profile'>
                <span className='player-character'>{profileName}</span>

                {
                    character ?
                        <img src={characterMap[character]!} alt={`${character}`} className='player-character-item-image' />
                        :
                        <div className='bank-character-item-image-container'>
                            <img src={BankCharacter} alt='Bank character' className='bank-character-item-image' />
                        </div>
                }
            </div>
        </div>
    )
}

export default PlayerItem;