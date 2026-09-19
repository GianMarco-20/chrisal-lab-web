import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToHash from './components/ScrollToHash';
import AppRouter from './routes/AppRouter';

export default function App() {
  return (
    <div className="app-container">
      <ScrollToHash />
      <Navbar />

      <main style={{ minHeight: '80vh' }}>
        <AppRouter />
      </main>

      <Footer />
    </div>
  );
}