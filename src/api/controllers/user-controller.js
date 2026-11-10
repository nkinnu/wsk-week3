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

async function getUserById(req, res, next) {
  const user = await findUserById(req.params.id);

  if (!user) {
    const error = new Error('Käyttäjää ei löytynyt');
    error.status = 404;
    return next(error);
  }

  res.json(user);
}

async function postUser(req, res, next) {
  req.body.password = await bcrypt.hash(req.body.password, 10);

  const result = await addUser(req.body);

  if (result) {
    res.status(201).json({
      message: 'Käyttäjä lisätty',
      result,
    });
  } else {
    const error = new Error('Käyttäjän lisääminen epäonnistui');
    error.status = 400;
    return next(error);
  }
}

async function putUser(req, res, next) {
  const id = Number(req.params.id);
  const user = res.locals.user;

  if (user.role !== 'admin' && user.user_id !== id) {
    const error = new Error('Forbidden');
    error.status = 403;
    return next(error);
  }

  const targetUser = await findUserById(id);

  if (!targetUser) {
    const error = new Error('Käyttäjää ei löytynyt');
    error.status = 404;
    return next(error);
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
    const error = new Error('Virheellinen rooli');
    error.status = 400;
    return next(error);
  }

  const result = await modifyUser(id, updatedData);

  if (result) {
    res.json({message: 'Käyttäjän tiedot päivitetty'});
  } else {
    const error = new Error('Käyttäjää ei löytynyt');
    error.status = 404;
    return next(error);
  }
}

async function deleteUser(req, res, next) {
  const id = Number(req.params.id);
  const user = res.locals.user;

  if (user.role !== 'admin' && user.user_id !== id) {
    const error = new Error('Forbidden');
    error.status = 403;
    return next(error);
  }

  const result = await removeUser(id);

  if (result) {
    res.json({message: 'Käyttäjä poistettu'});
  } else {
    const error = new Error('Käyttäjää ei löytynyt');
    error.status = 404;
    return next(error);
  }
}

async function getUserCats(req, res) {
  const cats = await listCatsByUserId(req.params.id);
  res.json(cats);
}

export {getAllUsers, getUserById, postUser, putUser, deleteUser, getUserCats};
