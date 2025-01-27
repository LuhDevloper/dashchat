import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import cors from 'cors';

const portRunning = process.env.PORT || 3000;  // Para garantir que a porta seja configurada dinamicamente no Vercel
const app = express();
const hostDb = 'localhost';  // Se você for usar no Vercel, vai ter que configurar o banco no Vercel também
const userDb = 'root';      // Ajuste de acordo com suas configurações do banco local ou remoto
const passDb = '';          // Ajuste conforme necessário
const dbName = 'dashchat';
const saltRounds = 10;

// Usando Pool de Conexões para melhor gerenciamento de recursos
const pool = mysql.createPool({
  host: hostDb,
  user: userDb,
  password: passDb,
  database: dbName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware para parsear o corpo da requisição em formato JSON
app.use(cors());
app.use(express.json());

// Função para criar a tabela se não existir (executar uma única vez)
const createTable = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL
  );
`;

pool.query(createTable, (err, result) => {
  if (err) {
    console.error('Erro ao criar a tabela usuarios:', err);
    return;
  }
  console.log('Tabela usuarios criada ou já existente!');
});

// Rota para login
app.post('/api/login', async (req, res) => {
  const { usuario, senha } = req.body;
  
  if (!usuario || !senha) {
    return res.status(400).json({ message: "Usuário e senha são obrigatórios!" });
  }

  const verifyUser = 'SELECT * FROM usuarios WHERE usuario = ?';
  
  pool.query(verifyUser, [usuario], async (err, result) => {
    if (err) {
      console.error('Erro ao consultar usuários:', err);
      return res.status(500).json({ message: "Erro ao verificar usuário!" });
    }

    if (result.length < 1) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    const user = result[0]; // Primeiro usuário encontrado

    // Verificar a senha
    const match = await bcrypt.compare(senha, user.senha);
    
    if (!match) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    res.status(200).json({ message: "Logado com sucesso!" });
  });
});

// Rota para cadastro
app.post('/api/cadastro', async (req, res) => {
  const { usuario, email, senha } = req.body;

  // Validação de campos obrigatórios
  if (!usuario || !email || !senha) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
  }

  // Verificar se o usuário já existe
  const verifyUser = 'SELECT * FROM usuarios WHERE usuario = ?';
  pool.query(verifyUser, [usuario], async (err, result) => {
    if (err) {
      console.error('Erro ao consultar usuários:', err);
      return res.status(500).json({ message: "Erro ao verificar usuário!" });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "Usuário já cadastrado!" });
    }

    // Gerar o hash da senha
    try {
      const hashedPassword = await bcrypt.hash(senha, saltRounds);

      // Inserir o novo usuário no banco de dados
      const insertUser = 'INSERT INTO usuarios (usuario, email, senha) VALUES (?, ?, ?)';
      pool.query(insertUser, [usuario, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Erro ao cadastrar usuário:', err);
          return res.status(500).json({ message: "Erro ao cadastrar usuário!" });
        }

        console.log('Novo usuário cadastrado:', usuario);
        res.status(201).json({
          message: 'Cadastro realizado com sucesso!',
          usuario,
          email
        });
      });
    } catch (err) {
      console.error('Erro ao gerar hash da senha:', err);
      res.status(500).json({ message: "Erro ao criar senha segura!" });
    }
  });
});

// Iniciar o servidor na porta configurada
app.listen(portRunning, () => {
  console.log(`Servidor iniciado na porta ${portRunning}`);
});
