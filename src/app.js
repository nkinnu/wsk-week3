import express from 'express';
import router from './api/index.js';
import {notFoundHandler, errorHandler} from './middlewares/error-handlers.js';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use('/public', express.static('public'));

app.use(express.json());

app.use('/api/v1', router);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
