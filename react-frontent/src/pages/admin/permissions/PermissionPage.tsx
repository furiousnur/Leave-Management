import React, {useEffect, useState} from 'react'; 
import AdminLayout from "../../../layout/AdminLayout"; 
import {permissions} from "../../../ApiRequest/ApiRequest"; 
import Permissions from "../../../component/admin/permissions/Permissions";

const PermissionPage: React.FC = () => {
    const [list,setList]=useState(null);
    useEffect(() => {
        document.title = 'Permission Page';
        (async ()=>{
            let res= await permissions();
            setList(res.data.data)
        })()
    }, []);

    return (
        <AdminLayout>
            <Permissions list={list}/>
        </AdminLayout>
    );
};

export default PermissionPage;
