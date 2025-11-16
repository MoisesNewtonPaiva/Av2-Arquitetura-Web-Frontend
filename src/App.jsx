
import React, { useState } from 'react';
import axios from 'axios';
import Login from './Pages/Login';     
import Alunos from './Pages/Alunos'; 
import Cursos from './Pages/Cursos';
import './App.css'
  


const API_URL = 'https://av2-arquitetura-web-nd87.onrender.com/api';

function App() {
  
  
  const [apiClient, setApiClient] = useState(null);
  const [loginError, setLoginError] = useState(null);

 
  const handleLogin = async (username, password) => {
    
    
    const authHeader = 'Basic ' + btoa(username + ':' + password);
    
    
    const client = axios.create({
      baseURL: API_URL,
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      }
    });

 
    try {
      
      await client.get('/alunos'); 
      
    
      setApiClient(client); 
      setLoginError(null);  
      
    } catch (err) {
  
      console.error("Erro no login:", err);
      setLoginError('Usuário ou senha inválidos.');
      setApiClient(null); 
    }
  };


  if (!apiClient) {

    return <Login onLogin={handleLogin} error={loginError} />;
  }


  return (
    <div className="App">

      <Alunos apiClient={apiClient} />
      
      <hr style={{ margin: '40px 0', border: '2px solid blue' }} />
      
      <Cursos apiClient={apiClient} />
    </div>
  );
}

export default App;
