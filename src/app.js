import 'dotenv/config';
import express from 'express';
import path from 'path';
import multer from 'multer';
import Youch from 'youch';
import 'express-async-errors';
import routes from './routes';

import './database';

import removeBodyId from './app/middlewares/removeBodyId';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
    this.server.use(removeBodyId);
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      }

      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error!' });
    });
  }
}

export default new App().server;
