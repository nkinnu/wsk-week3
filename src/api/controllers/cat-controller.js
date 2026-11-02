import {cats} from '../models/cat-model.js';

const getAllCats = (req, res) => {
  res.json(cats);
};

export {getAllCats};
