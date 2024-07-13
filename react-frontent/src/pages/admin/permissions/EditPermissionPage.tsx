import React, { useEffect } from 'react'; 
import AdminLayout from "../../../layout/AdminLayout";
import EditPermission from "../../../component/admin/permissions/EditPermission";

const EditPermissionPage: React.FC = () => {
    useEffect(() => {
        document.title = 'Edit Permission';
    }, []);

    return (
        <AdminLayout>
            <EditPermission />
        </AdminLayout>
    );
};

export default EditPermissionPage;
