// frontend/src/pages/EmployeeDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const EmployeeDashboard = () => {
    const [inventory, setInventory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                // Reusing Developer B's backend endpoint!
                const response = await api.get('/inventory/all');
                setInventory(response.data);
            } catch (error) {
                console.error("Failed to fetch inventory", error);
            }
        };
        fetchInventory();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    const handleRequest = (itemName) => {
        // In a full build, this would hit the POST /api/requests endpoint
        alert(`Success! A request ticket for the ${itemName} has been sent to IT. (Backend ticketing coming in v2!)`);
    };

    return (
        <div className="page-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ margin: 0 }}>Employee Equipment Portal</h2>
                <button onClick={handleLogout} className="btn" style={{ width: 'auto', background: '#dc2626', marginTop: 0 }}>Logout</button>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                <h3 style={{ marginTop: 0, color: '#334155' }}>Available Hardware</h3>
                <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Select the equipment you need for your workspace.</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    {inventory.map(item => (
                        <div key={item._id} style={{ border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '8px' }}>
                            <h4 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>{item.itemName}</h4>
                            <span style={{ display: 'inline-block', background: '#e0f2fe', color: '#0284c7', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem', marginBottom: '1rem' }}>
                                {item.category}
                            </span>
                            <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: item.availableStock > 0 ? '#16a34a' : '#dc2626' }}>
                                {item.availableStock > 0 ? `${item.availableStock} in stock` : 'Out of stock'}
                            </p>
                            <button 
                                onClick={() => handleRequest(item.itemName)}
                                disabled={item.availableStock === 0}
                                className="btn" 
                                style={{ marginTop: 0, background: item.availableStock === 0 ? '#cbd5e1' : '#2563eb', cursor: item.availableStock === 0 ? 'not-allowed' : 'pointer' }}
                            >
                                {item.availableStock > 0 ? 'Request Item' : 'Unavailable'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;