import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Importar Páginas
import Home from './pages/Home';
import ServiciosPage from './pages/ServiciosPage';

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<ServiciosPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}