import express from 'express';
import {body} from 'express-validator';
import {validationErrors} from '../../middlewares/error-handlers.js';

import {
  getAllCats,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

import {upload, createThumbnail} from '../../middlewares/upload.js';
import {authenticateToken} from '../../middlewares/authentication.js';

const catRouter = express.Router();

catRouter
  .route('/')
  .get(getAllCats)
  .post(
    authenticateToken,
    upload.single('cat'),
    body('cat_name').trim().isLength({min: 3, max: 50}),
    body('weight').isFloat(),
    body('birthdate').isDate(),
    validationErrors,
    createThumbnail,
    postCat
  );

catRouter
  .route('/:id')
  .get(getCatById)
  .put(
    authenticateToken,
    body('cat_name').trim().isLength({min: 3, max: 50}),
    body('weight').isFloat(),
    body('birthdate').isDate(),
    validationErrors,
    putCat
  )
  .delete(authenticateToken, deleteCat);

export default catRouter;
