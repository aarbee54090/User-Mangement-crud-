import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './user.css';

const API_URI = "http://localhost:5000/api/users";

const User = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ name: '', roll: '', age: '', contact: '', address: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URI);
      
      if (response.data?.users) {
        setUsers(response.data.users);
        setError('');
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      if (editingId) {
        await axios.put(`${API_URI}/${editingId}`, user);
        setEditingId(null);
      } else {
        await axios.post(API_URI, user);
      }
      setUser({ name: '', roll: '', age: '', contact: '', address: '' });
      await fetchUsers();
    } catch (error) {
      console.error("Error submitting user:", error);
      setError('Failed to save user. Please check your inputs.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URI}/${id}`);
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setError('Failed to delete user. Please try again.');
    }
  };

  const handleEdit = (u) => {
    setUser(u);
    setEditingId(u._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container">
      <h3>User Management</h3>
      
      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* User Form */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="text" 
              name="name" 
              value={user.name}
              onChange={handleChange}
              placeholder=" "
              required 
            />
            <label>Full Name</label>
          </div>

          <div className="input-group">
            <input 
              type="number" 
              name="roll" 
              value={user.roll}
              onChange={handleChange}
              placeholder=" "
              required 
            />
            <label>Roll No.</label>
          </div>

          <div className="input-group">
            <input 
              type="number" 
              name="age" 
              value={user.age}
              onChange={handleChange}
              placeholder=" "
              required 
            />
            <label>Age</label>
          </div>

          <div className="input-group">
            <input 
              type="tel" 
              name="contact" 
              value={user.contact}
              onChange={handleChange}
              placeholder=" "
              required 
            />
            <label>Contact</label>
          </div>

          <div className="input-group">
            <input 
              type="text" 
              name="address" 
              value={user.address}
              onChange={handleChange}
              placeholder=" "
              required 
            />
            <label>Address</label>
          </div>

          <button type="submit">
            {loading ? (
              <div className="loading"></div>
            ) : editingId ? (
              'Update User'
            ) : (
              'Add User'
            )}
          </button>
        </form>
      </div>

      {/* User List */}
      <ul className="user-list">
        {users.length > 0 ? (
          users.map((u) => (
            <li key={u._id}>
              <p><strong>Name:</strong> {u.name}</p>
              <p><strong>Roll No:</strong> {u.roll}</p>
              <p><strong>Age:</strong> {u.age}</p>
              <p><strong>Contact:</strong> {u.contact}</p>
              <p><strong>Address:</strong> {u.address}</p>
              
              <div className="user-actions">
                <button className="edit-btn" onClick={() => handleEdit(u)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(u._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          !loading && <p className="no-users">No users found</p>
        )}
      </ul>

      {loading && <div className="loading-overlay"><div className="loading"></div></div>}
    </div>
  );
};

export default User;