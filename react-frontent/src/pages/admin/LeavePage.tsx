import React, {useEffect, useState} from 'react';
import AdminLayout from "../../layout/AdminLayout"; 
import {leaves} from "../../ApiRequest/ApiRequest";
import Leave from "../../component/admin/Leave";

const LeavePage: React.FC = () => {
    const [list,setList]=useState(null);
    useEffect(() => {
        document.title = 'Leaves / Comp Off';
        (async ()=>{
            let res= await leaves();
            setList(res.data.data)
        })()
    }, []);

    return (
        <AdminLayout>
            <Leave list={list}/>
        </AdminLayout>
    );
};

export default LeavePage;