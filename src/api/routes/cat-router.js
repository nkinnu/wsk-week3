import express from 'express';

import {
  getAllCats,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

import multer from 'multer';
import {createThumbnail} from '../../middlewares/upload.js';

const upload = multer({dest: 'uploads/'});

const catRouter = express.Router();

catRouter
  .route('/')
  .get(getAllCats)
  .post(upload.single('cat'), createThumbnail, postCat);

catRouter.route('/:id').get(getCatById).delete(deleteCat).put(putCat);

export default catRouter;
