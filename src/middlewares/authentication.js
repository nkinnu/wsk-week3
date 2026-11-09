import jwt from 'jsonwebtoken';
import 'dotenv/config';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.sendStatus(403);
  }
}

export {authenticateToken};
