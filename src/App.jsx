import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRouter from './routes/AppRouter';

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      
      <main style={{ minHeight: '80vh' }}>
        <AppRouter />
      </main>

      <Footer />
    </div>
  );
}