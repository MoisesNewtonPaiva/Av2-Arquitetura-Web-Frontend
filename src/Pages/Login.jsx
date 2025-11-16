
import React, { useState } from 'react';
import './App.css';

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
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Senha: </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
        </div>
        

        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <button type="submit" style={{ width: '100%', marginTop: '20px' }}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;