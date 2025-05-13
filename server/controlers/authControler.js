const bcrypt = require('bcrypt');
const { getUserByEmail, createUser } = require('../models/userModel');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Campos obrigatórios' });
  }

  try {
 
    const existingUser = await getUserByEmail(email);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'E-mail já registrado' });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

  
    await createUser(username, email, hashedPassword);

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Campos obrigatórios' });
  }

  try {
    const user = await getUserByEmail(email);

    if (user.length === 0) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos' });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'E-mail ou senha inválidos' });
    }

    res.status(200).json({ message: 'Login bem-sucedido', user: user[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no servidor' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.status(200).json({ message: 'Login realizado com sucesso', token });
};



module.exports = { registerUser , loginUser };


