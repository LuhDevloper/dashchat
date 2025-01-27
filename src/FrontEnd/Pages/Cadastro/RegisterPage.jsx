import React, { useState } from "react";
import styles from "./RegisterPage.module.css";
import axios from "axios";

function RegisterPage() {
    const [formData, setFormData] = useState({
        usuario: "",          // Corrigido para 'usuario'
        email: "",
        senha: "",            // Corrigido para 'senha'
        confirmarSenha: ""    // Corrigido para 'confirmarSenha'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.senha !== formData.confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }
        try {
            const response = await axios.post("https://dashchat-tan.vercel.app/cadastro",{
                usuario: formData.usuario,
                email: formData.email,
                senha: formData.senha
            });
            console.log("Cadastro realizado com sucesso:", response.data);
            alert(response.data.message);
        } catch (error) {
            console.log(error)
        }
        // Lógica de cadastro (envio para a API, por exemplo)
        console.log("Formulário enviado", formData);
    };

    return (
        <div className={styles.containerIndex}>
            <form method="POST" onSubmit={handleSubmit} className={styles.formRegister}>
                <h1 className={styles.titleForm}>Cadastro</h1>

                <div className={styles.inputGroup}>
                    <label htmlFor="usuario">Nome de Usuário</label>
                    <input
                        type="text"
                        name="usuario" // Nome do campo corrigido para 'usuario'
                        id="usuario"
                        value={formData.usuario} // Corrigido para 'usuario'
                        onChange={handleChange}
                        placeholder="Escolha um nome de usuário"
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Digite seu e-mail"
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="senha">Senha</label>
                    <input
                        type="password"
                        name="senha" // Nome do campo corrigido para 'senha'
                        id="senha"
                        value={formData.senha} // Corrigido para 'senha'
                        onChange={handleChange}
                        placeholder="Digite sua senha"
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="confirmarSenha">Confirmar Senha</label>
                    <input
                        type="password"
                        name="confirmarSenha" // Nome do campo corrigido para 'confirmarSenha'
                        id="confirmarSenha"
                        value={formData.confirmarSenha} // Corrigido para 'confirmarSenha'
                        onChange={handleChange}
                        placeholder="Confirme sua senha"
                        required
                    />
                </div>

                <button type="submit">Cadastrar</button>

                <footer className={styles.rodapeDescricao}>
                    <span>
                        Já tem uma conta? <a href="/login">Faça login</a>
                    </span>
                </footer>
            </form>
        </div>
    );
}

export default RegisterPage;
