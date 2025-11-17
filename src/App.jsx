// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Pages/Login'; 
import Alunos from './Pages/Alunos'; 
import Cursos from './Pages/Cursos';
import './App.css';


const API_URL = "https://av2-arquitetura-web-nd87.onrender.com/api";

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(null);

  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (username, password) => {
    const authHeader = 'Basic ' + btoa(username + ':' + password);
    
   
    const loginTester = axios.create({
      baseURL: API_URL,
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      }
    });

    try {
     
      await loginTester.get('/alunos'); 
   
      localStorage.setItem('authToken', authHeader); 
      
      setIsLoggedIn(true); 
      setLoginError(null);  
      
    } catch (err) {
      console.error("Erro no login:", err);
      setLoginError('Usuário ou senha inválidos.');
      localStorage.removeItem('authToken'); 
      setIsLoggedIn(false); 
    }
  };


  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} error={loginError} />;
  }

 
  return (
    <div className="App">
      <Alunos />
      <hr style={{ margin: '40px 0', border: '2px solid blue' }} />
      <Cursos />
    </div>
  );
}

export default App;