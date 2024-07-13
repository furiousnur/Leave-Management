import React, {useEffect, useState} from 'react'; 
import AdminLayout from "../../../layout/AdminLayout";   
import NewRole from "../../../component/admin/roles/NewRole";
import {permissions} from "../../../ApiRequest/ApiRequest";

const NewRolePage: React.FC = () => {
    const [permissionList,setPermissionList]=useState(null);
    useEffect(() => {
        document.title = 'New Role';
        (async ()=>{
            let res= await permissions();
            setPermissionList(res.data.data)
        })()
    }, []);

    return (
        <AdminLayout>
            <NewRole permissions={permissionList}/>
        </AdminLayout>
    );
};

export default NewRolePage;
