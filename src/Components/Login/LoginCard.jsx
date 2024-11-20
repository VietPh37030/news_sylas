import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../CSS/loginindex.css';
import { useNavigate } from 'react-router-dom';

export default function LoginCard({ onLogin }) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState({ user: true, password: true });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleTogglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!user || !password) {
            setIsValid({
                user: Boolean(user),
                password: Boolean(password),
            });
            return;
        }
    
        setIsLoading(true);
        setErrorMessage('');
    
        try {
            const response = await fetch('http://localhost:3000/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: user,
                    password: password,
                }),
            });
    
            const data = await response.json();
    
            if (response.ok && data.token) {
                // Lưu thông tin người dùng vào localStorage
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userId', data.data._id); // Lưu userId từ API response
                
                onLogin();  // Notify parent component about login
    
                navigate('/home');
            } else {
                setErrorMessage(data.message || 'Invalid username or password');
            }
        } catch (error) {
            setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container min-vh-100 d-flex align-items-center justify-content-center">
            <div className="card login-card shadow-lg">
                <div className="card-body p-5">
                    <div className="text-center mb-4">
                        <img
                            src="https://tse3.mm.bing.net/th?id=OIP.hnScG3zE2G41YaH7Iir9zAHaHa&pid=Api&P=0&w=300&h=300"
                            alt="User Avatar"
                            className="rounded-circle avatar"
                        />
                        <h2 className="fw-bold">Welcome Back</h2>
                        <p className="text-muted">Please login to your account</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className={`form-control ${!isValid.user ? 'is-invalid' : ''}`}
                                    id="userInput"
                                    placeholder="username"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    required
                                />
                                <label htmlFor="userInput">Username</label>
                                <div className="invalid-feedback">Please enter a valid username</div>
                            </div>
                        </div>
                        <div className="mb-4 position-relative">
                            <div className="form-floating">
                                <input
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    className={`form-control ${!isValid.password ? 'is-invalid' : ''}`}
                                    id="passwordInput"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label htmlFor="passwordInput">Password</label>
                                <button
                                    type="button"
                                    className="btn toggle-password"
                                    onClick={handleTogglePasswordVisibility}
                                >
                                    <i className={`bi ${isPasswordVisible ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                </button>
                                <div className="invalid-feedback">Password is required</div>
                            </div>
                        </div>
                        {errorMessage && (
                            <div className="alert alert-danger" role="alert">
                                {errorMessage}
                            </div>
                        )}
                        <button
                            type="submit"
                            className={`btn btn-primary w-100 mb-3 ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                            Login
                        </button>
                    </form>
                    <p className="text-center text-muted">Don't have an account? <a href="/register">Register here</a></p>
                </div>
            </div>
        </div>
    );
}
