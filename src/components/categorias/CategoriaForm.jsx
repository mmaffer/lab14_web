import { useState, useEffect } from 'react';
import { categoriaService } from '../../services/categoriaService';

function CategoriaForm({ categoria, onSaveSuccess, onCancel }) {
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categoria) {
      setNombre(categoria.nombre);
    } else {
      setNombre('');
    }
  }, [categoria]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nombre.trim()) {
      alert('El nombre es requerido');
      return;
    }

    try {
      setLoading(true);
      if (categoria) {
        await categoriaService.update(categoria.id, { nombre });
      } else {
        await categoriaService.create({ nombre });
      }
      setNombre('');
      onSaveSuccess();
    } catch (err) {
      alert('Error al guardar la categoría');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setNombre('');
    onCancel();
  };

  return (
    <div className="form-container">
      <h3>{categoria ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la categoría"
            disabled={loading}
          />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
          {categoria && (
            <button type="button" onClick={handleCancel} className="btn-secondary">
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CategoriaForm;