import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usuario: "",
    senha: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://dashchat-tan.vercel.app/api/login", {
        usuario: formData.usuario,
        senha: formData.senha
      });
      alert(response.data.message);
      localStorage.setItem('usuario', formData.usuario);
      navigate('/inicio');
    } catch (error) {
      console.log(error);
      alert("Erro ao realizar o login");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/cadastro");
  };

  return (
    <div className={styles.containerIndex}>
      <form method="POST" onSubmit={handleSubmit} className={styles.formLogin}>
        <h1 className={styles.titleForm}>DashChat</h1>

        <div className={styles.inputGroup}>
          <label htmlFor="usuario">Usuário</label>
          <input
            type="text"
            name="usuario"
            id="usuario"
            placeholder="Digite seu usuário"
            value={formData.usuario}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            name="senha"
            id="senha"
            placeholder="Digite sua senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Entrar</button>

        <footer className={styles.rodapeDescricao}>
          <span>
            Não possui conta?
            <button type="button" onClick={handleRegisterRedirect}>Cadastre-se</button>
          </span>
        </footer>
      </form>
    </div>
  );
}

export default LoginPage;
