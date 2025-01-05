import { QRCodeSVG } from 'qrcode.react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import SuccessPage from "../../components/PageTemplate/SuccessPage/SuccessPage";
import { generateQrCode, hideBackButton, initMainButton } from "../../service/telegramService";
import './SuccessCreation.css';

const SuccessCreation: React.FC = () => {
    const navigate = useNavigate()
    const { roomId } = useParams<{ roomId?: string }>()
    useEffect(() => {
        hideBackButton()

        return initMainButton(() => navigate(`/banker-game`), true, 'Продолжить')
    }
    )
    if (roomId === null) {
        navigate('/create-room')
        return (
            <div>Something went wrong =(</div>
        )
    }

    return (
        <SuccessPage title='Комната успешно создана'>
            <div className="room-created__qrcode">
                <QRCodeSVG value={generateQrCode(+roomId!)} size={230} bgColor={"transparent"} />
            </div>

            <p className="room-created__description">
                Покажите QR-код другим игрокам для совместной игры
            </p>

            <p className="room-created__code">
                Код комнаты: <span>{`${roomId}`}</span>
            </p>
        </SuccessPage>
    );
};

export default SuccessCreation;
