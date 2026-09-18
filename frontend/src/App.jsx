import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css'; // Importing our new CSS file

// Placeholders - We will build these next!
const Login = () => <div className="page-container text-blue">Login Page (Developer A)</div>;
const EmployeeDashboard = () => <div className="page-container">Employee Portal (Developer A)</div>;
const AdminDashboard = () => <div className="page-container">Admin Inventory (Developer B)</div>;

function App() {
  return (
    <Router>
      <div>
        {/* Simple Navbar */}
        <nav className="navbar">
          <h1>TechGear Portal</h1>
        </nav>

        {/* Application Routes */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;