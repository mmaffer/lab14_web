import { useState, useEffect } from 'react';
import { productoService } from '../../services/productoService';
import { categoriaService } from '../../services/categoriaService';

function ProductoForm({ onSaveSuccess }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const data = await categoriaService.getAll();
      setCategorias(data);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nombre.trim() || !precio || !categoriaId) {
      alert('Todos los campos son requeridos');
      return;
    }

    try {
      setLoading(true);
      await productoService.create({
        nombre,
        precio: parseFloat(precio),
        categoriaId: parseInt(categoriaId)
      });
      
      setNombre('');
      setPrecio('');
      setCategoriaId('');
      onSaveSuccess();
    } catch (err) {
      alert('Error al crear el producto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h3>Nuevo Producto</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del producto"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label>Precio:</label>
          <input
            type="number"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="0.00"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label>Categoría:</label>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            disabled={loading}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Guardando...' : 'Crear Producto'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductoForm;