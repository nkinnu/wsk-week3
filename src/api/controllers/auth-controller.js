import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {findByUsername} from '../models/user-model.js';
import 'dotenv/config';

async function postLogin(req, res, next) {
  const {username, password} = req.body;

  if (typeof username !== 'string' || typeof password !== 'string') {
    const error = new Error('Invalid username or passowrd');
    error.status = 400;
    return next(error);
  }

  const user = await findByUsername(username);

  if (!user) {
    const error = new Error('Invalid username or password');
    error.status = 401;
    return next(error);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    const error = new Error('Invalid username or password');
    error.status = 401;
    return next(error);
  }

  const userWithoutPassword = {
    user_id: user.user_id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  res.json({user: userWithoutPassword, token});
}

function getMe(req, res) {
  res.json({
    message: 'Token ok',
    user: res.locals.user,
  });
}

export {postLogin, getMe};
