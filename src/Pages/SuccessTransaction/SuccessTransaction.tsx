import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../components/context/UserContext/UserContext";
import SuccessPage from "../../components/PageTemplate/SuccessPage/SuccessPage";
import { initBackButton, initMainButton } from "../../service/telegramService";


const SuccessTransaction: React.FC = () => {
    const navigate = useNavigate()
    const { isBanker } = useUserContext()
    useEffect(() => {
        const back = () => isBanker ? navigate('/banker-game') : navigate('/game')
        initBackButton(() => back())
        return initMainButton(() => back(), true, 'Продолжить')
    }
    )
    return (
        <SuccessPage title='Перевод выполнен успешно' />
    )
}

export default SuccessTransaction;