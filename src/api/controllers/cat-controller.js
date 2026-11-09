import {
  listAllCats,
  findCatById,
  addCat,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

async function getAllCats(req, res) {
  const cats = await listAllCats();
  res.json(cats);
}

async function getCatById(req, res) {
  const cat = await findCatById(req.params.id);

  if (!cat) {
    return res.status(404).json({message: 'Kissaa ei löytynyt'});
  }

  res.json(cat);
}

async function postCat(req, res) {
  console.log(req.body);
  console.log(req.file);

  if (!req.file) {
    return res.status(400).json({message: 'Kuva puuttuu'});
  }

  req.body.filename = req.file.filename;

  req.body.owner = res.locals.user.user_id;

  const result = await addCat(req.body);

  if (result) {
    res.status(201).json({
      message: 'Kissa lisätty',
      result,
    });
  } else {
    res.sendStatus(400);
  }
}

async function putCat(req, res) {
  console.log('PUT id:', req.params.id);
  console.log('PUT body:', req.body);

  const result = await modifyCat(
    Number(req.params.id),
    req.body,
    res.locals.user
  );

  if (result) {
    res.json({message: 'Kissan tiedot päivitetty'});
  } else {
    res.status(404).json({message: 'Kissaa ei löytynyt'});
  }
}

async function deleteCat(req, res) {
  const result = await removeCat(Number(req.params.id), res.locals.user);

  if (result) {
    res.json({message: 'Kissa poistettu'});
  } else {
    res.status(404).json({message: 'Kissaa ei löytynyt'});
  }
}

export {getAllCats, getCatById, postCat, putCat, deleteCat};
