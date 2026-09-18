// frontend/src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig.js';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Let's create a quick function to register a test admin so we can log in!
    const handleRegisterTestUser = async () => {
        try {
            await api.post('/auth/register', {
                name: "Admin Tester",
                email: "admin@test.com",
                password: "password123",
                role: "Admin"
            });
            alert("Test Admin Created! You can now log in.");
        } catch (err) {
            alert("Test user already exists or error occurred.");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/auth/login', { email, password });
            
            // Save the token to local storage so our Axios interceptor can use it
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);

            // Redirect based on role
            if (response.data.role === 'Admin') {
                navigate('/admin');
            } else {
                navigate('/employee');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 style={{marginTop: 0}}>Login to TechGear</h2>
                {error && <div className="error-msg">{error}</div>}
                
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn">Login</button>
                </form>
                
                <hr style={{margin: '2rem 0'}} />
                <button onClick={handleRegisterTestUser} style={{background: '#64748b'}} className="btn">
                    Create Test Admin (admin@test.com)
                </button>
            </div>
        </div>
    );
};

export default Login;