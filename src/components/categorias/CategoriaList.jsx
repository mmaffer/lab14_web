import { useState, useEffect } from 'react';
import { categoriaService } from '../../services/categoriaService';
import CategoriaForm from './CategoriaForm';

function CategoriaList() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategoria, setEditingCategoria] = useState(null);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      setLoading(true);
      const data = await categoriaService.getAll();
      setCategorias(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar categorías');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      try {
        await categoriaService.delete(id);
        fetchCategorias();
      } catch (err) {
        alert('Error al eliminar la categoría');
      }
    }
  };

  const handleEdit = (categoria) => {
    setEditingCategoria(categoria);
  };

  const handleSaveSuccess = () => {
    setEditingCategoria(null);
    fetchCategorias();
  };

  if (loading) return <div className="loading">Cargando categorías...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h2>Gestión de Categorías</h2>
      
      <CategoriaForm 
        categoria={editingCategoria} 
        onSaveSuccess={handleSaveSuccess}
        onCancel={() => setEditingCategoria(null)}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.nombre}</td>
              <td>
                <button onClick={() => handleEdit(categoria)} className="btn-edit">
                  Editar
                </button>
                <button onClick={() => handleDelete(categoria.id)} className="btn-delete">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoriaList;