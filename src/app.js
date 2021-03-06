import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './database';

import express from 'express';
import cors from 'cors';
import delay from 'express-delay';

import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import tokensRoutes from './routes/tokenRoutes';
import studentRoutes from './routes/studentRoutes';
import pictureRoutes from './routes/pictureRoutes';

const whiteList = [
  'http://localhost:3000',
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(delay(2000));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokensRoutes);
    this.app.use('/students/', studentRoutes);
    this.app.use('/pictures/', pictureRoutes);
  }
}

export default new App().app;
