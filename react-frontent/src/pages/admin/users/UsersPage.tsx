import React, { useEffect, useState } from 'react';
import AdminLayout from "../../../layout/AdminLayout";
import { users } from "../../../ApiRequest/ApiRequest";
import Users from "../../../component/admin/users/Users";

const UsersPage: React.FC = () => {
    const [list, setList] = useState([]);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        document.title = 'User List';
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            let res = await users();
            setList(res.data.data.users);
            setRoles(res.data.data.roles);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    return (
        <AdminLayout>
            <Users
                list={list}
                roles = {roles}
            />
        </AdminLayout>
    );
};

export default UsersPage;