
// Simulando banco de dados em memória para testes
let users = [];

// Função para buscar um usuário pelo email
const getUserByEmail = async (email) => {
  return users.filter(user => user.email === email);
};

// Função para criar um novo usuário
const createUser = async (username, email, hashedPassword) => {
  const newUser = { id: users.length + 1, username, email, password: hashedPassword };
  users.push(newUser);
};

module.exports = { getUserByEmail, createUser };
