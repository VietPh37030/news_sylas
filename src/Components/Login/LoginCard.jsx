import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../CSS/loginindex.css'; // Add the custom styles in index.css
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export default function LoginCard({ onLogin }) {  // Receive onLogin as a prop
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState({ user: true, password: true });
    const [errorMessage, setErrorMessage] = useState(''); // To show error message if login fails
    const navigate = useNavigate(); // Initialize navigate function

    const handleTogglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input
        if (!user || !password) {
            setIsValid({
                user: Boolean(user),
                password: Boolean(password),
            });
            return;
        }

        setIsLoading(true);
        setErrorMessage(''); // Reset previous error message

        try {
            const response = await fetch('http://localhost:3000/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Cho phép gửi cookie kèm request
                body: JSON.stringify({
                    username: user,
                    password: password,
                }),
            });
            

            const data = await response.json();

            // Check if the response is successful
            if (response.ok && data.token) {
                // If login is successful, handle the response (e.g., save token)
                localStorage.setItem('authToken', data.token);

                // Call onLogin to update the login state in the parent component (App)
                onLogin(); // Notify parent (App) about successful login

                // Redirect to the NewBoard page
                navigate('/home'); // Redirect using react-router
            } else {
                // If the login fails, display the error message from the API
                setErrorMessage(data.message || 'Invalid username or password');
            }
        } catch (error) {
            // Handle any network errors
            setErrorMessage('An error occurred. Please try again later.');
            console.error("Login error:", error);
            setErrorMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');  
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
                    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
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
                                    aria-label="Toggle password visibility"
                                    onClick={handleTogglePasswordVisibility}
                                >
                                    <i className={`bi ${isPasswordVisible ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                </button>
                                <div className="invalid-feedback">Password is required</div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="rememberMe" />
                                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                            </div>
                            <a href="#" className="text-primary text-decoration-none">Forgot Password?</a>
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
                            <span className="login-text">Login</span>
                            {isLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                        </button>
                        <button type="button" className="btn btn-outline-secondary w-100" onClick={() => navigate('/register')}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
