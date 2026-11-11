import express from 'express';
import {authenticateToken} from '../../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrors} from '../../middlewares/error-handlers.js';

import {
  getAllUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
  getUserCats,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter
  .route('/')
  .get(getAllUsers)
  .post(
    body('name').trim().notEmpty(),
    body('email').trim().isEmail(),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8}),
    validationErrors,
    postUser
  );

userRouter
  .route('/:id')
  .get(getUserById)
  .put(
    authenticateToken,
    body('name').trim().notEmpty(),
    body('email').trim().isEmail(),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('role').optional().isIn(['user', 'admin']),
    validationErrors,
    putUser
  )
  .delete(authenticateToken, deleteUser);

userRouter.get('/:id/cats', getUserCats);

export default userRouter;
