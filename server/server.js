
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import detectPort from 'detect-port';
import pool from './config/db.js'; // Importa a configuração do banco de dados

// Carrega as variáveis de ambiente
dotenv.config();

const app = express();
const DEFAULT_PORT = 8080;

// Configuração de middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; media-src 'self' data:;");
  next();
});

// Rota para registrar um novo usuário
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, password]
    );

    res.status(201).json({ message: 'Usuário criado com sucesso', user: result.rows[0] });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});

// Rota para fazer login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const result = await pool.query('SELECT id, name, email, password FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = 'fake-jwt-token'; // Substitua por lógica real de geração de token JWT
    res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

// Inicia o servidor
detectPort(DEFAULT_PORT).then((port) => {
  if (port !== DEFAULT_PORT) {
    console.log(`Porta ${DEFAULT_PORT} já está em uso. Usando a porta ${port} em vez disso.`);
  }

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
});
