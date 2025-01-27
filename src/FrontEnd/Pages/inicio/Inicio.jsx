// HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate hook for programmatic navigation
import styles from './Inicio.module.css';

function randomColorUser(){
  let color = {
    white: "#fff",
  }
}
function HomePage() {
  const usuario = localStorage.getItem('usuario');
  const navigate = useNavigate(); // Using the useNavigate hook
  const handleRedirect = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className={styles.chatContainer}>
      {usuario ? (
        <h1>Olá, {usuario}!</h1>
      ) : (
        <h2>
          Faça Login para continuar!
          <button type="button" onClick={handleRedirect}>Ir para Login</button>
        </h2>
      )}
    </div>
  );
}

export default HomePage;
