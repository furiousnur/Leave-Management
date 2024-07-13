import React, { useEffect, useState } from 'react';
import AdminLayout from "../../../layout/AdminLayout";
import { users } from "../../../ApiRequest/ApiRequest";
import Users from "../../../component/admin/users/Users";

const UsersPage: React.FC = () => {
    const [list, setList] = useState([]);
    const [roles, setRoles] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        document.title = 'User List';
        fetchUsers();
    }, [page]);

    const fetchUsers = async () => {
        try {
            let res = await users(page);
            setList(res.data.data.users);
            setRoles(res.data.data.roles);
            setTotal(res.data.data.total);
            setTotalPages(res.data.data.totalPages);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <AdminLayout>
            <Users
                list={list}
                page={page}
                total={total}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                roles = {roles}
            />
        </AdminLayout>
    );
};

export default UsersPage;