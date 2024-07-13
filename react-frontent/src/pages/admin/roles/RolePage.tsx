import React, {useEffect, useState} from 'react'; 
import AdminLayout from "../../../layout/AdminLayout"; 
import {roles} from "../../../ApiRequest/ApiRequest";
import Roles from "../../../component/admin/roles/Roles";

const RolePage: React.FC = () => {
    const [list,setList]=useState(null);
    useEffect(() => {
        document.title = 'Roles';
        (async ()=>{
            let res= await roles();
            setList(res.data.data)
        })()
    }, []);

    return (
        <AdminLayout>
            <Roles list={list}/>
        </AdminLayout>
    );
};

export default RolePage;
