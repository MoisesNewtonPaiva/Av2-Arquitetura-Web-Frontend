
import React, { useState, useEffect } from 'react';
import './App.css';


function Alunos({ apiClient }) {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, [apiClient]); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      }
    } else {
      try {
        const response = await apiClient.post('/alunos', formData);
        setAlunos([...alunos, response.data]);
        clearForm();
        setError(null);
      } catch (err) {
        setError('Erro ao cadastrar aluno.');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza?')) {
      try {
        await apiClient.delete(`/alunos/${id}`);
        setAlunos(alunos.filter(aluno => aluno.id !== id));
        setError(null);
      } catch (err) {
        setError('Erro ao deletar aluno.');
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
    <div className="alunos-container">
      <h1>Gestão de Alunos</h1>
      

      <h2>{isEditing ? 'Editar Aluno' : 'Cadastrar Novo Aluno'}</h2>
      <form onSubmit={handleSubmit}>

        <div><label>Nome: </label><input type="text" name="nome" value={formData.nome} onChange={handleInputChange} required /></div>
        <div><label>Email: </label><input type="email" name="email" value={formData.email} onChange={handleInputChange} required /></div>
        <div><label>Matrícula: </label><input type="text" name="matricula" value={formData.matricula} onChange={handleInputChange} required /></div>
        <button type="submit">{isEditing ? 'Atualizar' : 'Cadastrar'}</button>
        {isEditing && (<button type="button" onClick={clearForm}>Cancelar</button>)}
      </form>

      <hr />

 
      <h2>Lista de Alunos</h2>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {alunos.map(aluno => (
          <li key={aluno.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc' }}>
            <strong>{aluno.nome}</strong> (Mat: {aluno.matricula})
            <br />
            <button onClick={() => handleEdit(aluno)}>Editar</button>
            <button onClick={() => handleDelete(aluno.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Alunos;