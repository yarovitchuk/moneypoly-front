import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ActionSelection from "./Pages/ActionSelection/ActionSelection";
import BankerGame from "./Pages/BankerGame/BankerGame";
import CharacterSelection from "./Pages/CharacterSelection/CharacterSelection";
import Game from "./Pages/Game/Game";
import RoomCreation from "./Pages/RoomCreation/RoomCreation";
import SuccessCreation from "./Pages/SuccessCreation/SuccessCreation";
import SuccessTransaction from "./Pages/SuccessTransaction/SuccessTransaction";
import Transfer from "./Pages/Transfer/Transfer";
import WarningPage from "./Pages/WarningPage/WarningPage";
import Header from "./components/Header/Header";
import { RoomCreationProvider } from "./components/context/RoomCreationProvider/RoomCreationProvider";
import { TransferProvider } from "./components/context/TransferProvider/TransferProvider";
import { UserContextProvider } from "./components/context/UserContext/UserContext";
import { initApp } from "./service/telegramService";

const App: React.FC = () => {
    useEffect(() => initApp())
    return (
        <div className="App">
            <Router>
                <QueryClientProvider client={new QueryClient()}>
                    <UserContextProvider>
                        <Header />
                        <RoomCreationProvider>
                            <Routes>
                                <Route path='/' element={<ActionSelection />} />
                                <Route path='/create-room' element={<RoomCreation />} />
                                <Route path='/select-character' element={<CharacterSelection />} />
                                <Route path='/success-creation/:roomId' element={<SuccessCreation />} />
                            </Routes>
                        </RoomCreationProvider>
                        <TransferProvider>
                            <Routes>
                                <Route path='/game' element={<Game />} />
                                <Route path='/banker-game' element={<BankerGame />} />
                                <Route path='/transfer' element={<Transfer />} />
                                <Route path='/success-transaction' element={<SuccessTransaction />} />
                                <Route path='/no-telegram' element={<WarningPage />} />
                            </Routes>
                        </TransferProvider>
                    </UserContextProvider>
                </QueryClientProvider>
            </Router>
        </div>
    )
}

export default App;
