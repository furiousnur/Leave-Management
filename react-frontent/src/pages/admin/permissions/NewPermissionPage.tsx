import React, { useEffect } from 'react'; 
import AdminLayout from "../../../layout/AdminLayout";
import NewPermission from "../../../component/admin/permissions/NewPermission";

const NewPermissionPage: React.FC = () => {
    useEffect(() => {
        document.title = 'New Permission';
    }, []);

    return (
        <AdminLayout>
            <NewPermission />
        </AdminLayout>
    );
};

export default NewPermissionPage;
