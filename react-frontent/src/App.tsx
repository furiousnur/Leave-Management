import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage.jsx';
import DashboardPage from "./pages/admin/DashboardPage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App