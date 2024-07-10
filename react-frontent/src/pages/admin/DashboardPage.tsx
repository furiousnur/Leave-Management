import React, { useEffect } from 'react';
import Dashboard from "../../component/admin/Dashboard";
import AdminLayout from "../../layout/AdminLayout";

const DashboardPage: React.FC = () => {
    useEffect(() => {
        document.title = 'Dashboard';
    }, []);

    return (
        <AdminLayout>
            <Dashboard />
        </AdminLayout>
    );
};

export default DashboardPage;