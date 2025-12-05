import { useState } from 'react';
import CategoriaList from './components/categorias/CategoriaList';
import ProductoList from './components/productos/ProductoList';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('categorias');

  return (
    <div className="app">
      <header>
        <h1>🛍️ Sistema de Microservicios</h1>
        <p>Gestión de Categorías y Productos</p>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === 'categorias' ? 'active' : ''}
          onClick={() => setActiveTab('categorias')}
        >
          📁 Categorías
        </button>
        <button
          className={activeTab === 'productos' ? 'active' : ''}
          onClick={() => setActiveTab('productos')}
        >
          📦 Productos
        </button>
      </nav>

      <main>
        {activeTab === 'categorias' ? <CategoriaList /> : <ProductoList />}
      </main>

      <footer>
        <p>Backend: Spring Boot Microservices | Frontend: React + Vite</p>
      </footer>
    </div>
  );
}

export default App;