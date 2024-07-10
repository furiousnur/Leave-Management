import React, { useEffect } from 'react';  

const Logout = () => {
    useEffect(() => {
        const performLogout = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    throw new Error("No token found");
                } 
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
