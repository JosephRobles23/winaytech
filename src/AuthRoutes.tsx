// AuthRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import Welcome from './pages/Welcome';

const AuthRoutes: React.FC = () => (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="welcome" element={<Welcome />} />
    </Routes>
);

export default AuthRoutes;
