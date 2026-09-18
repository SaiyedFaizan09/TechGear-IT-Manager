// frontend/src/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const AdminDashboard = () => {
    const [inventory, setInventory] = useState([]);
    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('');
    const [totalStock, setTotalStock] = useState('');
    const navigate = useNavigate();

    // Fetch inventory as soon as the component loads
    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const response = await api.get('/inventory/all');
            setInventory(response.data);
        } catch (error) {
            console.error("Failed to fetch inventory", error);
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            await api.post('/inventory/add', {
                itemName,
                category,
                totalStock: Number(totalStock)
            });
            setItemName('');
            setCategory('');
            setTotalStock('');
            fetchInventory(); // Instantly refresh the list on screen!
        } catch (error) {
            alert("Failed to add item");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <div className="page-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ margin: 0 }}>Admin Inventory Dashboard</h2>
                <button onClick={handleLogout} className="btn" style={{ width: 'auto', background: '#dc2626', marginTop: 0 }}>Logout</button>
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {/* Panel 1: Add New Item */}
                <div className="auth-card" style={{ flex: 1, minWidth: '300px', margin: 0, alignSelf: 'flex-start' }}>
                    <h3 style={{ marginTop: 0 }}>Add New Hardware</h3>
                    <form onSubmit={handleAddItem}>
                        <div className="form-group">
                            <label>Item Name (e.g., ThinkPad T14)</label>
                            <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Category (e.g., Laptop, Monitor)</label>
                            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Total Stock</label>
                            <input type="number" value={totalStock} onChange={(e) => setTotalStock(e.target.value)} required min="1" />
                        </div>
                        <button type="submit" className="btn">Add to Inventory</button>
                    </form>
                </div>

                {/* Panel 2: Current Inventory List */}
                <div style={{ flex: 2, minWidth: '400px', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ marginTop: 0 }}>Current Stock</h3>
                    {inventory.length === 0 ? <p>No items in inventory. Add some gear!</p> : (
                        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                                    <th style={{ padding: '0.75rem' }}>Item</th>
                                    <th style={{ padding: '0.75rem' }}>Category</th>
                                    <th style={{ padding: '0.75rem' }}>Available Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.map(item => (
                                    <tr key={item._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '0.75rem' }}>{item.itemName}</td>
                                        <td style={{ padding: '0.75rem', color: '#64748b' }}>{item.category}</td>
                                        <td style={{ padding: '0.75rem' }}>
                                            <span style={{ fontWeight: 'bold', color: item.availableStock > 0 ? '#16a34a' : '#dc2626' }}>
                                                {item.availableStock} / {item.totalStock}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;