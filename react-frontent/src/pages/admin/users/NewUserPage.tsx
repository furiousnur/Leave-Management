import React, { useEffect } from 'react'; 
import AdminLayout from "../../../layout/AdminLayout";
import NewUser from "../../../component/admin/users/NewUser";  

const NewUserPage: React.FC = () => {
    useEffect(() => {
        document.title = 'New User';
    }, []);

    return (
        <AdminLayout>
            <NewUser />
        </AdminLayout>
    );
};

export default NewUserPage;
