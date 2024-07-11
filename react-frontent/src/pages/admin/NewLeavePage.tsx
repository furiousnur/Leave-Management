import React, { useEffect } from 'react';
import AdminLayout from "../../layout/AdminLayout";
import NewLeave from "../../component/admin/NewLeave";

const NewLeavePage: React.FC = () => {
    useEffect(() => {
        document.title = 'New Leave / Comp Off';
    }, []);

    return (
        <AdminLayout>
            <NewLeave />
        </AdminLayout>
    );
};

export default NewLeavePage;