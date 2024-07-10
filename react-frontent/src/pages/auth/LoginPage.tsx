import React, {useEffect} from 'react';
import Login from "../../component/auth/Login";

const LoginPage = () => {
    useEffect(()=>{
        document.title="Login";
    },[]);

    return (
        <Login/>
    );
};

export default LoginPage;