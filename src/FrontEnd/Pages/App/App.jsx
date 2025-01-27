// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../Login/LoginPage';
import Cadastro from '../Cadastro/RegisterPage';
import Inicio from '../inicio/Inicio';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/"  element={<Navigate to="/login" />} />      
      <Route path="/inicio"  element={<Inicio/>} />
        <Route path="/login"  element={<HomePage />} />
        <Route path="/cadastro"  element={<Cadastro />} />
        <Route path="*" element={<h2>404 - Página Não Encontrada</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
