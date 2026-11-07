import {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
} from '../models/user-model.js';

import {listCatsByUserId} from '../models/cat-model.js';

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
  const result = await modifyUser(Number(req.params.id), req.body);

  if (result) {
    res.json({message: 'Käyttäjän tiedot päivitetty'});
  } else {
    res.status(404).json({message: 'Käyttäjää ei löytynyt'});
  }
}

async function deleteUser(req, res) {
  const result = await removeUser(Number(req.params.id));

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
