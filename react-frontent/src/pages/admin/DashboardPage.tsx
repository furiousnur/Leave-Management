import React, {useEffect, useState} from 'react';
import Dashboard from "../../component/admin/Dashboard";
import AdminLayout from "../../layout/AdminLayout";
import {userDetails} from "../../ApiRequest/ApiRequest";
import {toast} from "react-toastify"; 

const DashboardPage: React.FC = () => {
    const [details,setDetails]=useState(null);
    
    useEffect(() => {
        document.title = 'Dashboard';
        const msg = localStorage.getItem('loginMsg');
        if (msg) {
            toast.success(msg);
        }
        (async ()=>{
            let res= await userDetails();
            setDetails(res.data.data)
        })()
        localStorage.removeItem('loginMsg');
    }, []);

    return (
        <AdminLayout>
            <Dashboard userDetails={details}/>
        </AdminLayout>
    );
};

export default DashboardPage;
