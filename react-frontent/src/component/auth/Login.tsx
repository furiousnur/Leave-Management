import React, { useEffect, useState } from 'react';
import '../../assets/css/Login.css';
import {loginUser} from "../../ApiRequest/ApiRequest";

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
                console.log(response.data.error == "Bad Request")
                if (response.data.error == "Bad Request") {
                    setErrorResponse(response.data.message);
                } else {
                    setSuccessResponse(response.data.message);
                    const token = response.data;
                    localStorage.setItem('authToken', token);
                    window.location.href = '/dashboard';
                }
            } catch (error) {
                setErrors(error.response.data.errors);
            }
        } else {
            setErrorResponse("Fill up the form correctly");
        }
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Login</h2>
                {errorResponse && <div className="error-message">{errorResponse}</div>}
                {successResponse && <div className="success-message">{successResponse}</div>}
                <form onSubmit={handleForm}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Login</button>
                    <div className="forgot-password">
                        <a href="/forgot-password">Forgot Password?</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;