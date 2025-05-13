// Simulando banco de dados em memória
let users = [];

const getUserByEmail = async (email) => {
  return users.filter(user => user.email === email);
};

const createUser = async (username, email, hashedPassword) => {
  const newUser = { id: users.length + 1, username, email, password: hashedPassword };
  users.push(newUser);
};

module.exports = { getUserByEmail, createUser };
