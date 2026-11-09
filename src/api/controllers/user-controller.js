import {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
} from '../models/user-model.js';

import {listCatsByUserId} from '../models/cat-model.js';
import bcrypt from 'bcrypt';

async function getAllUsers(req, res) {
  const users = await listAllUsers();
  res.json(users);
}

async function getUserById(req, res) {
  const user = await findUserById(req.params.id);

  if (!user) {
    return res.status(404).json({message: 'Käyttäjää ei löytynyt'});
  }

  res.json(user);
}

async function postUser(req, res) {
  req.body.password = await bcrypt.hash(req.body.password, 10);

  const result = await addUser(req.body);

  if (result) {
    res.status(201).json({
      message: 'Käyttäjä lisätty',
      result,
    });
  } else {
    res.sendStatus(400);
  }
}

async function putUser(req, res) {
  const id = Number(req.params.id);
  const user = res.locals.user;

  if (user.role !== 'admin' && user.user_id !== id) {
    return res.sendStatus(403);
  }

  const targetUser = await findUserById(id);

  if (!targetUser) {
    return res.sendStatus(404);
  }

  const updatedData = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    role: targetUser.role,
  };

  if (user.role === 'admin' && req.body.role) {
    updatedData.role = req.body.role;
  }

  if (!['user', 'admin'].includes(updatedData.role)) {
    return res.sendStatus(400);
  }

  const result = await modifyUser(id, updatedData);

  if (result) {
    res.json({message: 'Käyttäjän tiedot päivitetty'});
  } else {
    res.status(404).json({message: 'Käyttäjää ei löytynyt'});
  }
}

async function deleteUser(req, res) {
  const id = Number(req.params.id);
  const user = res.locals.user;

  if (user.role !== 'admin' && user.user_id !== id) {
    return res.sendStatus(403);
  }

  const result = await removeUser(id);

  if (result) {
    res.json({message: 'Käyttäjä poistettu'});
  } else {
    res.status(404).json({message: 'Käyttäjää ei löytynyt'});
  }
}

async function getUserCats(req, res) {
  const cats = await listCatsByUserId(req.params.id);
  res.json(cats);
}

export {getAllUsers, getUserById, postUser, putUser, deleteUser, getUserCats};
