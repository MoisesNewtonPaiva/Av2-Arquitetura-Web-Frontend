
import React, { useState, useEffect } from 'react';
import './App.css';


function Cursos({ apiClient }) { 
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [formData, setFormData] = useState({
    nome: '',
    cargaHoraria: ''
  });


  const [isEditing, setIsEditing] = useState(false);
  const [currentCursoId, setCurrentCursoId] = useState(null);


  const fetchCursos = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/cursos'); 
      setCursos(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao buscar cursos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const clearForm = () => {
    setFormData({ nome: '', cargaHoraria: '' });
    setIsEditing(false);
    setCurrentCursoId(null);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const cursoData = {
        nome: formData.nome,
        cargaHoraria: parseInt(formData.cargaHoraria) 
    };

    if (isEditing) {
 
      try {
        const response = await apiClient.put(`/cursos/${currentCursoId}`, cursoData);
        setCursos(cursos.map(curso => 
          curso.id === currentCursoId ? response.data : curso
        ));
        clearForm();
        setError(null);
      } catch (err) {
        setError('Erro ao atualizar curso.');
      }
    } else {

      try {
        const response = await apiClient.post('/cursos', cursoData);
        setCursos([...cursos, response.data]);
        clearForm();
        setError(null);
      } catch (err) {
        setError('Erro ao cadastrar curso.');
      }
    }
  };


  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este curso?')) {
      try {
        await apiClient.delete(`/cursos/${id}`);
        setCursos(cursos.filter(curso => curso.id !== id));
        setError(null);
      } catch (err) {
        setError('Erro ao deletar curso.');
      }
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
          <input 
            type="text" 
            name="nome" 
            value={formData.nome} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <div>
          <label>Carga Horária: </label>
          <input 
            type="number" 
            name="cargaHoraria" 
            value={formData.cargaHoraria} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        <button type="submit">
          {isEditing ? 'Atualizar Curso' : 'Cadastrar Curso'}
        </button>
        {isEditing && (
          <button type="button" onClick={clearForm} style={{ marginLeft: '10px' }}>
            Cancelar Edição
          </button>
        )}
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
            <button onClick={() => handleEdit(curso)} style={{ marginRight: '5px' }}>
              Editar
            </button>
            <button onClick={() => handleDelete(curso.id)} style={{ backgroundColor: '#ffaaaa' }}>
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cursos;