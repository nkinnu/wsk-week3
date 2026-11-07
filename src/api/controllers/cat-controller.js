import {listAllCats, findCatById, addCat} from '../models/cat-model.js';

function getAllCats(req, res) {
  res.json(listAllCats());
}

function getCatById(req, res) {
  const id = Number(req.params.id);
  const cat = findCatById(id);

  if (!cat) {
    return res.status(404).json({message: 'Kissaa ei löytynyt'});
  }

  res.json(cat);
}

function postCat(req, res) {
  console.log(req.body);
  console.log(req.file);

  if (!req.file) {
    return res.status(400).json({message: 'Kuva puuttuu'});
  }

  req.body.filename = req.file.filename;

  const id = addCat(req.body);
  res.status(201).json({cat_id: id});
}

function putCat(req, res) {
  res.json({message: 'Cat item updated'});
}

function deleteCat(req, res) {
  res.json({message: 'Cat item deleted'});
}

export {getAllCats, getCatById, postCat, putCat, deleteCat};
