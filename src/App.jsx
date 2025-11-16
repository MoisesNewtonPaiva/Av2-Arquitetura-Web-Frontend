// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const API_URL = "https://av2-arquitetura-web-nd87.onrender.com/api"; 


const username = 'admin';
const password = 'adminpass';
const authHeader = 'Basic ' + btoa(username + ':' + password);


const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': authHeader,
    'Content-Type': 'application/json'
  }
});


function App() {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    matricula: ''
  });


  const [isEditing, setIsEditing] = useState(false);
  const [currentAlunoId, setCurrentAlunoId] = useState(null);


  const fetchAlunos = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/alunos');
      setAlunos(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao buscar alunos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const clearForm = () => {
    setFormData({ nome: '', email: '', matricula: '' });
    setIsEditing(false);
    setCurrentAlunoId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    if (isEditing) {

      try {
        const response = await apiClient.put(`/alunos/${currentAlunoId}`, formData);
        
        setAlunos(alunos.map(aluno => 
          aluno.id === currentAlunoId ? response.data : aluno
        ));
        
        clearForm();
        setError(null);
      } catch (err) {
        setError('Erro ao atualizar aluno.');
        console.error(err);
      }
    } else {

      try {
        const response = await apiClient.post('/alunos', formData);
        setAlunos([...alunos, response.data]); 
        clearForm();
        setError(null);
      } catch (err) {
        setError('Erro ao cadastrar aluno.');
        console.error(err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este aluno?')) {
      try {
        await apiClient.delete(`/alunos/${id}`);
        
        setAlunos(alunos.filter(aluno => aluno.id !== id));
        setError(null);
      } catch (err) {
        setError('Erro ao deletar aluno.');
        console.error(err);
      }
    }
  };

  const handleEdit = (aluno) => {
    setIsEditing(true);
    setCurrentAlunoId(aluno.id);
    setFormData({
      nome: aluno.nome,
      email: aluno.email,
      matricula: aluno.matricula
    });
    window.scrollTo(0, 0); 
  };



  return (
    <div className="App">
      <h1>Sistema Acadêmico</h1>

      <h2>{isEditing ? 'Editar Aluno' : 'Cadastrar Novo Aluno'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome: </label>
          <input 
            type="text" 
            name="nome" 
            value={formData.nome} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div>
          <label>Email: </label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div>
          <label>Matrícula: </label>
          <input 
            type="text" 
            name="matricula" 
            value={formData.matricula} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        
        <button type="submit">
          {isEditing ? 'Atualizar Aluno' : 'Cadastrar Aluno'}
        </button>
        {isEditing && (
          <button type="button" onClick={clearForm} style={{ marginLeft: '10px' }}>
            Cancelar Edição
          </button>
        )}

      </form>

      <hr style={{ margin: '20px 0' }} />

      <h2>Lista de Alunos</h2>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {alunos.map(aluno => (
          <li key={aluno.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <strong>{aluno.nome}</strong> (Mat: {aluno.matricula})
            <br />
            Email: {aluno.email}
            <br />
            <button onClick={() => handleEdit(aluno)} style={{ marginRight: '5px' }}>
              Editar
            </button>
            <button onClick={() => handleDelete(aluno.id)} style={{ backgroundColor: '#ffaaaa' }}>
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;