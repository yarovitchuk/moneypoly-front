import { useMutation } from '@tanstack/react-query';
import { QRCodeSVG } from 'qrcode.react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as QrCodeIcon } from '../../assets/qr-code.svg';
import { characterMap } from "../../enums/Character";
import { deletePlayer } from '../../service/apiService';
import { generateQrCode, getId } from '../../service/telegramService';
import Balance from "../Balance/Balance";
import { useUserContext } from "../context/UserContext/UserContext";
import Modal from '../Modal/Modal';
import './Header.css';

const Header: React.FC = () => {
    const navigate = useNavigate()
    const { balance, name, roomId, character, outRoom } = useUserContext()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const mutation = useMutation({
        mutationFn: (request: { roomId: number, userId: number }) => deletePlayer(request.roomId, request.userId),
        onSuccess: () => {
            outRoom()
            setIsModalOpen(false)
            navigate('/')
        }
    })

    const handleLeaveRoom = () => mutation.mutate({ roomId: roomId!, userId: getId() });

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className='header'>
            <Balance balanceValue={balance} />
            <div className="player-profile">
                <span className="header-character">{name}</span>
                {character && (
                    <div className='profile-container' onClick={toggleModal}>
                        <img src={characterMap[character]!}
                            width={50} height={50}
                            alt=""
                            className="profile-picture"
                        />
                        <QrCodeIcon className='profile-icon' />
                    </div>
                )}

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <QRCodeSVG value={generateQrCode(roomId!)} size={200} />
                    <button className="leave-room-button" onClick={handleLeaveRoom}>
                        Покинуть комнату
                    </button>
                </Modal>
            </div>
        </div>
    )
}

export default Header;