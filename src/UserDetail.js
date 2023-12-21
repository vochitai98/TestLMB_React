import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');

  useEffect(() => {
    fetchUserDetails(userId);
  }, [userId]);

  const fetchUserDetails = async (id) => {
    try {
      const response = await axios.get(
        'http://localhost/LMB/clientApi.php',
        {
          params: {
            id,
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  return (
    <div>
      <h1>User Detail</h1>
      {user !== null ? (
        <div>
          <p>ID: {user.id}</p>
          <p>Nom: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Address: {user.address}</p>
          <p>Telephone: {user.phone}</p>
          <NavLink to={`/editUser?userId=${user.id}`}>
            <button>Edit</button>
          </NavLink>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserDetail;
