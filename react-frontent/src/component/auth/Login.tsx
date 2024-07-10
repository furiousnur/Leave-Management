import React from 'react';
import '../../assets/css/Login.css';

const Login: React.FC = () => {
    return (
        <>
            <div className="login-container">
                <h2>Login</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                        />
                    </div>
                    <button type="submit">Login</button>
                    <div className="forgot-password">
                        <a href="/forgot-password">Forgot Password?</a>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;