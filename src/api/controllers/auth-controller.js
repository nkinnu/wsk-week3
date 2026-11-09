import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {findByUsername} from '../models/user-model.js';
import 'dotenv/config';

async function postLogin(req, res) {
  const {username, password} = req.body;

  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.sendStatus(400);
  }

  const user = await findByUsername(username);

  if (!user) {
    return res.sendStatus(401);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.sendStatus(401);
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
