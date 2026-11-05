import {listAllUsers, findUserById, addUser} from '../models/user-model.js';

function getAllUsers(req, res) {
  res.json(listAllUsers());
}

function getUserById(req, res) {
  const id = Number(req.params.id);
  const user = findUserById(id);

  if (!user) {
    return res.status(404).json({message: 'Käyttäjää ei löytynyt'});
  }

  res.json(user);
}

function postUser(req, res) {
  const id = addUser(req.body);
  res.status(201).json({user_id: id});
}

function putUser(req, res) {
  res.json({message: 'User item updated'});
}

function deleteUser(req, res) {
  res.json({message: 'User item deleted'});
}

export {getAllUsers, getUserById, postUser, putUser, deleteUser};
