import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Login from './pages/Login'; 
import AdminDashboard from './pages/AdminDashboard'; // 1. Import the new dashboard

// Keep Employee placeholder for now
const EmployeeDashboard = () => <div className="page-container">Employee Portal (Developer A)</div>;

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
          <Route path="/employee" element={<EmployeeDashboard />} />
          
          {/* 2. Replace the Admin placeholder */}
          <Route path="/admin" element={<AdminDashboard />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;