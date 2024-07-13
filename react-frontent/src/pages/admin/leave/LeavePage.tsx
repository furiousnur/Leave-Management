import React, { useEffect, useState } from 'react';
import AdminLayout from "../../../layout/AdminLayout";
import { leaves } from "../../../ApiRequest/ApiRequest";
import Leave from "../../../component/admin/leave/Leave";

const LeavePage: React.FC = () => {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1); 

    useEffect(() => {
        document.title = 'Leaves / Comp Off';
        fetchLeaves();
    }, [page]);

    const fetchLeaves = async () => {
        try {
            let res = await leaves(page);
            setList(res.data.data);
        } catch (error) {
            console.error('Failed to fetch leaves:', error);
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <AdminLayout>
            <Leave
                list={list}
                page={list ? list.page : 1}
                total={list ? list.total : 0}
                totalPages={list ? list.totalPages : 0}
                onPageChange={handlePageChange}
            />
        </AdminLayout>
    );
};

export default LeavePage;
