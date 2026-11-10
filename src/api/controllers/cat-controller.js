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

async function getCatById(req, res, next) {
  const cat = await findCatById(req.params.id);

  if (!cat) {
    const error = new Error('Kissaa ei löytynyt');
    error.status = 404;
    return next(error);
  }

  res.json(cat);
}

async function postCat(req, res, next) {
  if (!req.file) {
    const error = new Error('Invalid or missing file');
    error.status = 400;
    return next(error);
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
    const error = new Error('Kissan lisääminen epäonnistui');
    error.status = 400;
    return next(error);
  }
}

async function putCat(req, res, next) {
  const result = await modifyCat(
    Number(req.params.id),
    req.body,
    res.locals.user
  );

  if (result) {
    res.json({message: 'Kissan tiedot päivitetty'});
  } else {
    const error = new Error('Kissaa ei löytynyt');
    error.status = 404;
    return next(error);
  }
}

async function deleteCat(req, res, next) {
  const result = await removeCat(Number(req.params.id), res.locals.user);

  if (result) {
    res.json({message: 'Kissa poistettu'});
  } else {
    const error = new Error('Kissaa ei löytynyt');
    error.status = 404;
    return next(error);
  }
}

export {getAllCats, getCatById, postCat, putCat, deleteCat};
