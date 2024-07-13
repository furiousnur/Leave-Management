import React, { useEffect } from 'react'; 
import AdminLayout from "../../../layout/AdminLayout"; 
import EditUser from "../../../component/admin/users/EditUser";  

const EditUserPage: React.FC = () => {
    useEffect(() => {
        document.title = 'Edit User';
    }, []);

    return (
        <AdminLayout>
            <EditUser />
        </AdminLayout>
    );
};

export default EditUserPage;
