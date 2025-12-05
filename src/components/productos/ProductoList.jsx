import { useState, useEffect } from 'react';
import { productoService } from '../../services/productoService';
import ProductoForm from './ProductoForm';

function ProductoList() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const data = await productoService.getAll();
      setProductos(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await productoService.delete(id);
        fetchProductos();
      } catch (err) {
        alert('Error al eliminar el producto');
      }
    }
  };

  if (loading) return <div className="loading">Cargando productos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h2>Gestión de Productos</h2>
      
      <ProductoForm onSaveSuccess={fetchProductos} />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((item) => {
            // Manejo flexible de la estructura de respuesta
            const producto = item.producto || item;
            const categoria = item.categoria;
            
            return (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>${producto.precio?.toFixed(2)}</td>
                <td>{categoria?.nombre || `ID: ${producto.categoriaId}`}</td>
                <td>
                  <button onClick={() => handleDelete(producto.id)} className="btn-delete">
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductoList;