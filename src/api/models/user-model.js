// mock data
const users = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },

  {
    user_id: 3610,
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@metropolia.fi',
    role: 'user',
    password: 'password123',
  },
];

function listAllUsers() {
  return users;
}

function findUserById(id) {
  return users.find((item) => item.user_id === id);
}

function addUser(user) {
  const {name, username, email, role, password} = user;
  const newId = users[users.length - 1].user_id + 1;

  users.push({
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  });

  return newId;
}

export {listAllUsers, findUserById, addUser};
