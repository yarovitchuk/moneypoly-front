import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useRoomCreation } from "../../components/context/RoomCreationProvider/RoomCreationProvider";
import NumericPage from "../../components/PageTemplate/NumericPage/NumericPage";
import { initBackButton, initMainButton } from "../../service/telegramService";
import './RoomCreation.css';
import { useUserContext } from '../../components/context/UserContext/UserContext';

const RoomCreation: React.FC = () => {
    const navigate = useNavigate()
    const { startSum, setStartSum, resetStartSum } = useRoomCreation()
    const { setIsBanker } = useUserContext()

    useEffect(() => {
        initBackButton(() => {
            navigate('/')
            resetStartSum()
        })
        return initMainButton(
            () => {
                setIsBanker(true)
                navigate('/select-character')
            },
            true, 'Продолжить');
    })

    return (
        <NumericPage
            title='Создание комнаты'
            description='Введите стартовую сумму для каждого игрока'
            startSum={startSum}
            onChange={setStartSum}
        />
    )
};

export default RoomCreation;

