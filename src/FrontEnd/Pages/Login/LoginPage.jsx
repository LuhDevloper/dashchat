import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Corrigido para importar axios

function LoginPage() {
  const navigate = useNavigate(); // Colocar o hook dentro do componente
  const [formData, setFormData] = useState({
    usuario: "",          // Corrigido para 'usuario'
    senha: ""             // Corrigido para 'senha'
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
      const response = await axios.post("http://localhost:3000/login", {
        usuario: formData.usuario,  // Enviando os dados de login
        senha: formData.senha
      });
      alert(response.data.message); // Exibe a resposta da API
      localStorage.setItem('usuario', formData.usuario);
      navigate('/inicio');
    } catch (error) {
      console.log(error);
      alert("Erro ao realizar o login");
    }
  };


  const handleRegisterRedirect = () => {
    navigate("/cadastro"); // Redireciona para a página de cadastro
  };

  return (
    <div className={styles.containerIndex}>
      <form method="POST" onSubmit={handleSubmit} className={styles.formLogin}> {/* Removido action="#" e adicionado onSubmit */}
        <h1 className={styles.titleForm}>DashChat</h1>

        <div className={styles.inputGroup}>
          <label htmlFor="usuario">Usuário</label>
          <input
            type="text"
            name="usuario"  // Corrigido para 'usuario' que é o nome da variável
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
            name="senha"  // Corrigido para 'senha' que é o nome da variável
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
