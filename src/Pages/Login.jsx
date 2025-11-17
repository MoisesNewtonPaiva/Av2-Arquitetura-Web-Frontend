// src/Pages/Login.jsx
import React, { useState } from 'react';

function Login({ onLogin, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="login-container">
      <h2>Login do Sistema</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário: </label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Senha: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <button type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;