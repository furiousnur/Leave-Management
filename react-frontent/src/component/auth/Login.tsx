import React, { useEffect, useState } from 'react';
import '../../assets/css/Login.css';
import {loginUser} from "../../ApiRequest/ApiRequest";
import {toast} from "react-toastify";

const Login: React.FC = () => {
    const [input, setInput] = useState({});
    const [successResponse, setSuccessResponse] = useState("");
    const [errorResponse, setErrorResponse] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessResponse("");
            setErrorResponse("");
        }, 30000);
        return () => {
            clearTimeout(timer);
        }
    }, [successResponse, errorResponse]);

    const handleChange = (e) => setInput({
        ...input,
        [e.currentTarget.name]: e.currentTarget.value
    });

    const handleForm = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        if (Object.values(data).every(value => value.trim() !== '')) {
            try {
                const response = await loginUser(data);
                if (response.data.error == "Bad Request") {  
                    toast.error(response.data.message)
                } else { 
                    const token = response.data.token;
                    const userDetails = response.data.user;
                    localStorage.setItem('authToken', token);
                    localStorage.setItem('userId', userDetails.id);
                    localStorage.setItem('loginMsg', 'Login Successful');
                    localStorage.setItem('userDetails', JSON.stringify(userDetails));
                    window.location.href = '/dashboard';
                }
            } catch (error) {
                toast.error(error.response.data.errors)
            }
        } else {
            toast.error("Fill up the form correctly");
        }
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleForm}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" onChange={handleChange} placeholder="Enter username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" onChange={handleChange} placeholder="Enter password"/>
                    </div>
                    <button type="submit" style={{width: "100%"}}>Login</button>
                    <div className="forgot-password">
                        <a href="/forgot-password">Forgot Password?</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;