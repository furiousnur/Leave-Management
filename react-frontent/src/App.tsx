import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage.jsx';
import DashboardPage from './pages/admin/DashboardPage';
import Logout from './component/auth/Logout';
import {hasPermission, verifyToken} from "./ApiRequest/ApiRequest";
import LeavePage from "./pages/admin/leave/LeavePage";
import NewLeavePage from "./pages/admin/leave/NewLeavePage";
import {ToastContainer} from "react-toastify";
import UsersPage from "./pages/admin/users/UsersPage";
import RolePage from "./pages/admin/roles/RolePage";
import NewRolePage from "./pages/admin/roles/NewRolePage";
import EditRolePage from "./pages/admin/roles/EditRolePage";
import DeleteRole from "./component/admin/roles/DeleteRole";
import PermissionPage from "./pages/admin/permissions/PermissionPage";
import NewPermissionPage from "./pages/admin/permissions/NewPermissionPage";
import EditPermissionPage from "./pages/admin/permissions/EditPermissionPage";
import DeletePermission from "./component/admin/permissions/DeletePermission";
import NewUserPage from "./pages/admin/users/NewUserPage";
import EditUserPage from "./pages/admin/users/EditUserPage";
import ProtectedRoute from "./component/ProtectedRoute";

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
                    localStorage.removeItem('userDetails');
                    localStorage.removeItem('userId');
                    setTokenValid(false); 
                } else {
                    const userDetails = res.data.data;
                    if(userDetails.userRole != null){
                        localStorage.removeItem('permissions');
                        localStorage.removeItem('roleId');
                        localStorage.setItem('roleId', userDetails.userRole.role.id);
                        localStorage.setItem('permissions', JSON.stringify(userDetails.userRole.role.permissions));
                    }
                    setTokenValid(true);
                }
            } catch (error) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userDetails');
                localStorage.removeItem('userId');
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
                    <Route path="/dashboard" element={<ProtectedRoute element={DashboardPage} hasPermission={hasPermission('sidebar-dashboard')} />} />
                    <Route path="/leaves" element={<ProtectedRoute element={LeavePage} hasPermission={hasPermission('leave-list')} />} />
                    <Route path="/leaves/create" element={<ProtectedRoute element={NewLeavePage} hasPermission={hasPermission('leave-create')} />} />
                    <Route path="/users/list" element={<ProtectedRoute element={UsersPage} hasPermission={hasPermission('user-list')} />} />
                    <Route path="/users/create" element={<ProtectedRoute element={NewUserPage} hasPermission={hasPermission('user-create')} />} />
                    <Route path="/users/edit/:id" element={<ProtectedRoute element={EditUserPage} hasPermission={hasPermission('user-edit')} />} />
                    <Route path="/roles/list" element={<ProtectedRoute element={RolePage} hasPermission={hasPermission('role-list')} />} />
                    <Route path="/roles/create" element={<ProtectedRoute element={NewRolePage} hasPermission={hasPermission('role-create')} />} />
                    <Route path="/roles/edit/:id" element={<ProtectedRoute element={EditRolePage} hasPermission={hasPermission('role-edit')} />} />
                    <Route path="/roles/:id/delete" element={<ProtectedRoute element={DeleteRole} hasPermission={hasPermission('role-delete')} />} />
                    <Route path="/permissions/list" element={<ProtectedRoute element={PermissionPage} hasPermission={hasPermission('permission-list')} />} />
                    <Route path="/permissions/create" element={<ProtectedRoute element={NewPermissionPage} hasPermission={hasPermission('permission-create')} />} />
                    <Route path="/permissions/edit/:id" element={<ProtectedRoute element={EditPermissionPage} hasPermission={hasPermission('permission-edit')} />} />
                    <Route path="/permissions/:id/delete" element={<ProtectedRoute element={DeletePermission} hasPermission={hasPermission('permission-delete')} />} />
                    <Route path="/logout" element={<ProtectedRoute element={Logout} hasPermission={true} />} />
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
            <ToastContainer />
        </BrowserRouter>
    );
}