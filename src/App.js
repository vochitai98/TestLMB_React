import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import UserList from './UserList';
import UserDetail from './UserDetail';
import UserEdit from './UserEdit';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Sử dụng 'element' để xác định phần tử hoặc Component để hiển thị */}
          <Route path="/" element={<UserList />} />
          <Route path="/user" element={<UserDetail />} />
          <Route path="/editUser" element={<UserEdit />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
