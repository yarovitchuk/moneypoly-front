import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTransfer } from "../../components/context/TransferProvider/TransferProvider";
import { useUserContext } from "../../components/context/UserContext/UserContext";
import NumericPage from "../../components/PageTemplate/NumericPage/NumericPage";
import { transfer } from "../../service/apiService";
import { initBackButton, initMainButton } from "../../service/telegramService";


const Transfer: React.FC = () => {
    const navigate = useNavigate()
    const { roomId, isBanker } = useUserContext()
    const { amount, setAmount, toIds, renewContext, fromId } = useTransfer()

    const transferMutation = useMutation({
        mutationFn: (data: {
            roomId: number,
            request: {
                fromId: number,
                toIds: number[],
                amount: number
            }
        }) => transfer(data.roomId, data.request),
        onSuccess: () => {
            renewContext()
            navigate('/success-transaction')
        }
    })

    useEffect(() => {
        initBackButton(() => isBanker ? navigate('/banker-game') : navigate('/game'))
        return initMainButton(() => {
            transferMutation.mutate({
                roomId: roomId!,
                request: {
                    fromId: fromId!,
                    toIds: toIds,
                    amount: amount!
                }
            })
        }, true, 'Продолжить')
    }, [navigate, roomId, amount, toIds, renewContext, isBanker, fromId, transferMutation])

    return (
        <NumericPage
            title='Перевод'
            description='Укажите сумму для перевода'
            onChange={setAmount}
        />
    )
}

export default Transfer;