import { Link, Routes, Route, useLocation } from 'react-router-dom';
import PatronMenu from './pages/PatronMenu';
import BartenderQueue from './pages/BartenderQueue';
import Home from './pages/home';

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="container">
      <header className={`app-header ${isHome ? 'hero' : ''}`}>
        <h1>Bartender MVC</h1>
        <nav className="app-nav">
          <Link to="/menu">Menu</Link>
          <Link to="/queue">Order Queue</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<PatronMenu />} />
          <Route path="/queue" element={<BartenderQueue />} />
        </Routes>
      </main>
    </div>
  );
}
