import React, { useEffect } from 'react';
import {logout} from "../../ApiRequest/ApiRequest";  

const Logout = () => {
    useEffect(() => {
        const performLogout = async () => {
            try {
                await logout();
                localStorage.removeItem('authToken');
                localStorage.removeItem('userId');
                localStorage.setItem('logoutMsg', 'Logout Successful');
                localStorage.removeItem('userDetails');
                window.location.href = '/';
            } catch (error) {
                console.error("Logout failed", error);
            }
        };

        performLogout();
    }, []);

    return (
        <div>Loading...</div>
    );
};

export default Logout;
