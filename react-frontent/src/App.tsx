import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage.jsx';
import DashboardPage from './pages/admin/DashboardPage';
import Logout from './component/auth/Logout';
import NoticePage from './pages/admin/NoticePage';
import AttendancesPage from './pages/admin/AttendancesPage';
import OfflineAttendancesPage from './pages/admin/OfflineAttendancesPage';
import NewOfflineAttendancePage from './pages/admin/NewOfflineAttendancePage';
import {verifyToken} from "./ApiRequest/ApiRequest";
import CalendarPage from "./pages/admin/CalendarPage";
import LeavePage from "./pages/admin/LeavePage";
import NewLeavePage from "./pages/admin/NewLeavePage";

function App() {
    const [tokenValid, setTokenValid] = useState<boolean | null>(null);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            setTokenValid(false);
            return;
        }
        (async () => {
            try {
                const res = await verifyToken();
                if (res.data.statusCode === 401 || res.data.message === "Unauthorized") {
                    localStorage.removeItem('authToken');
                    setTokenValid(false);
                } else {
                    setTokenValid(true);
                }
            } catch (error) {
                localStorage.removeItem('authToken');
                setTokenValid(false);
            }
        })();
    }, []);

    if (tokenValid === null) {
        return <div>Loading...</div>;
    }

    return (
        <Routes>
            {tokenValid ? (
                <>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/leaves" element={<LeavePage />} />
                    <Route path="/leaves/create" element={<NewLeavePage />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </>
            ) : (
                <>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </>
            )}
        </Routes>
    );
}

export default function AppWrapper() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}