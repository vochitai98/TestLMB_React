import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserEdit = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails(userId);
  }, [userId]);

  const [name, setName] = useState(user ? user.name : '');
  const [phone, setPhone] = useState(user ? user.phone : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [address, setAddres] = useState(user ? user.email : '');

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
      setName(response.data.name);
      setEmail(response.data.email);
      setPhone(response.data.phone);
      setAddres(response.data.address);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchUserEdit = async ({id=userId, name, email, phone }) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('address', address);

      const response = await axios.post(
        'http://localhost/LMB/clientApi.php',
        formData,
        {
          params: {
            id,
          },
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setUser(response.data);
      navigate("/");
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const handleInputChangeName = (event) => {
    setName(event.target.value);
  };

  const handleInputChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleInputChangePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleInputChangeAddress = (event) => {
    setAddres(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', name, email, phone);
    fetchUserEdit({ id: userId, name, email, phone });
  };

  return (
    <div>
      <h1>User Edit</h1>
      {user ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>ID:</label>
            <input type="text" name="id" value={user.id} readOnly />
          </div>
          <div>
            <label>Nom:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChangeName}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleInputChangeEmail}
            />
          </div>
          <div>
            <label>Address:</label>
            <input type="text" 
            name="address" 
            value={address}
            onChange={handleInputChangeAddress}
            />
            
          </div>
          <div>
            <label>Telephone:</label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={handleInputChangePhone}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserEdit;