// src/Pages/Cursos.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importe o axios aqui


const API_URL = "https://av2-arquitetura-web-nd87.onrender.com/api";

const authHeader = localStorage.getItem('authToken');

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': authHeader,
    'Content-Type': 'application/json'
  }
});


function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ nome: '', cargaHoraria: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentCursoId, setCurrentCursoId] = useState(null);


  useEffect(() => {
    const fetchCursos = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/cursos'); 
        setCursos(response.data);
        setError(null);
      } catch (err) {
        setError('Erro ao buscar cursos.');
        console.error("ERRO DETALHADO (Cursos):", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (apiClient) {
      fetchCursos();
    }
  }, [apiClient]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearForm = () => {
    setFormData({ nome: '', cargaHoraria: '' });
    setIsEditing(false);
    setCurrentCursoId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const cargaHorariaNum = parseInt(formData.cargaHoraria);
    if (isNaN(cargaHorariaNum) || cargaHorariaNum <= 0) {
        setError('Carga horária deve ser um número válido e positivo.');
        return;
    }
    const cursoData = { nome: formData.nome, cargaHoraria: cargaHorariaNum };

    if (isEditing) {
      try {
        const response = await apiClient.put(`/cursos/${currentCursoId}`, cursoData);
        setCursos(cursos.map(curso => 
          curso.id === currentCursoId ? response.data : curso
        ));
        clearForm();
        setError(null);
      } catch (err) { setError('Erro ao atualizar curso.'); }
    } else {
      try {
        const response = await apiClient.post('/cursos', cursoData);
        setCursos([...cursos, response.data]);
        clearForm();
        setError(null);
      } catch (err) { setError('Erro ao cadastrar curso.'); }
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza?')) {
      try {
        await apiClient.delete(`/cursos/${id}`);
        setCursos(cursos.filter(curso => curso.id !== id));
        setError(null);
      } catch (err) { setError('Erro ao deletar curso.'); }
    }
  };

  const handleEdit = (curso) => {
    setIsEditing(true);
    setCurrentCursoId(curso.id);
    setFormData({
      nome: curso.nome,
      cargaHoraria: curso.cargaHoraria
    });
    window.scrollTo(0, 0); 
  };

  return (
    <div className="cursos-container">
      <h1>Gestão de Cursos</h1>
      <h2>{isEditing ? 'Editar Curso' : 'Cadastrar Novo Curso'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome do Curso: </label>
          <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Carga Horária: </label>
          <input type="number" name="cargaHoraria" value={formData.cargaHoraria} onChange={handleInputChange} required />
        </div>
        <button type="submit">{isEditing ? 'Atualizar Curso' : 'Cadastrar Curso'}</button>
        {isEditing && (<button type="button" onClick={clearForm}>Cancelar</button>)}
      </form>
      <hr style={{ margin: '20px 0' }} />
      <h2>Lista de Cursos</h2>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cursos.map(curso => (
          <li key={curso.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <strong>{curso.nome}</strong> (Carga: {curso.cargaHoraria}h)
            <br />
            <button onClick={() => handleEdit(curso)}>Editar</button>
            <button onClick={() => handleDelete(curso.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cursos;