import React, {useEffect, useState} from 'react'; 
import AdminLayout from "../../../layout/AdminLayout";    
import EditRole from "../../../component/admin/roles/EditRole";
import {permissions} from "../../../ApiRequest/ApiRequest";

const EditRolePage: React.FC = () => {
    const [permissionList,setPermissionList]=useState(null);
    useEffect(() => {
        document.title = 'Edit Role';
        (async ()=>{
            let res= await permissions();
            setPermissionList(res.data.data)
        })()
    }, []);

    return (
        <AdminLayout>
            <EditRole permissions={permissionList} />
        </AdminLayout>
    );
};

export default EditRolePage;
