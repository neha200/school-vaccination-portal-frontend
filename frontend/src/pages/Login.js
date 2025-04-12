import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin') {
      localStorage.setItem('user', username);
      navigate('/dashboard');
    } else {
      alert('Invalid login');
    }
  };

  return (
    <div>
      <h2>Login (Simulated)</h2>
      <input
        type="text"
        placeholder="Username (admin)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
