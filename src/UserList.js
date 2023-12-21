// src/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Link } from 'react-router-dom';

const UserList = ({ history }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost/LMB/clientApi.php');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserClick = (userId) => {
    history.push(`/user/${userId}`);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewClick = (itemId) => {};

  return (
    <div>
      <h1>Recherche d'une fiche de contact</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredUsers.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Address</th>
              <th>Ville</th>
              <th>Telephone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.ville}</td>
                <td>{item.phone}</td>
                <td>
                  <Link to={`/user?userId=${item.id}`}>Xem</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default UserList;
