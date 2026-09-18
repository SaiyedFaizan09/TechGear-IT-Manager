import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Login from './pages/Login'; // Import the real component

// Keep these placeholders for now
const EmployeeDashboard = () => <div className="page-container">Employee Portal (Developer A)</div>;
const AdminDashboard = () => <div className="page-container">Admin Inventory (Developer B)</div>;

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <h1>TechGear Portal</h1>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} /> {/* Use real component */}
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;