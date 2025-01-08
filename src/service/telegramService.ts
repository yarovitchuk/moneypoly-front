export const initApp = () => {
    Telegram.WebApp.setHeaderColor('#FFFFFF')
    Telegram.WebApp.setBackgroundColor('#EFEEF4')
    Telegram.WebApp.setBottomBarColor('#EFEEF4')
    Telegram.WebApp.disableVerticalSwipes()
    Telegram.WebApp.expand()
}

export const initBackButton = (onClick: () => void) => {
    Telegram.WebApp.BackButton.show()
    Telegram.WebApp.BackButton.onClick(onClick)
}

export const initMainButton = (
    onClick: () => void,
    show: boolean,
    name?: string,
) => {
    if (name) Telegram.WebApp.MainButton.setText(name)
    Telegram.WebApp.MainButton.onClick(onClick)
    if (!show) {
        Telegram.WebApp.MainButton.hide()
    } else {
        Telegram.WebApp.MainButton.show()
    }

    return () => {
        Telegram.WebApp.MainButton.offClick(onClick)
    }
}

export const hideButtons = () => {
    Telegram.WebApp.MainButton.hide()
    Telegram.WebApp.BackButton.hide()
}

export const hideMainButton = () => Telegram.WebApp.MainButton.hide()
export const showMainButton = () => Telegram.WebApp.MainButton.show()
export const hideBackButton = () => Telegram.WebApp.BackButton.hide()

export const getProfileName = () => Telegram.WebApp.initDataUnsafe.user?.first_name!!
export const getId = () => Telegram.WebApp.initDataUnsafe.user?.id!!

export const scanOnClick = (onScan: (data: string) => void) => () => {
    Telegram.WebApp.showScanQrPopup(
        {
            text: 'Пожалуйста отсканируйте QR-код комнаты'
        },
        (data) => {
            Telegram.WebApp.closeScanQrPopup()
            onScan(data)
        }
    )
}

export const exit = () => Telegram.WebApp.close()

export const generateQrCode = (roomId: number) => `https://t.me/moneypoly_bot?startapp=${roomId}`

export const parseRoomIdFromUrl = (url: string): string => {
    const parsedUrl = new URL(url);
    const startParam = parsedUrl.searchParams.get('startapp');
    return startParam!.replace('room_', '');

};