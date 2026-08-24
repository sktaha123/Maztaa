import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Opportunities } from './pages/Opportunities';
import { Apply } from './pages/Apply';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/opportunities/apply" element={<Apply />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/refer" element={<Navigate to="/opportunities" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Secret Admin Routes */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/maztaa-admin" element={<Admin />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;