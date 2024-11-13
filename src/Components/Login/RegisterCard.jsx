import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function RegisterCard() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await fetch('http://localhost:3000/api/v1/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: user, password: password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Registration successful! Please log in.");
                navigate('/login'); // Redirect to login after successful registration
            } else {
                setErrorMessage(data.message || 'Registration failed');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container min-vh-100 d-flex align-items-center justify-content-center">
            <div className="card login-card shadow-lg">
                <div className="card-body p-5">
                    <h2 className="fw-bold">Create an Account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {errorMessage && (
                            <div className="alert alert-danger">{errorMessage}</div>
                        )}
                        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                    <button className="btn btn-link" onClick={() => navigate('/login')}>
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
}
