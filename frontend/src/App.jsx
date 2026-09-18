import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Login from './pages/Login'; 
import AdminDashboard from './pages/AdminDashboard'; 
import EmployeeDashboard from './pages/EmployeeDashboard'; // 1. Import Employee Dashboard

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <h1>TechGear Portal</h1>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          
          {/* 2. Replace the Employee placeholder */}
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;