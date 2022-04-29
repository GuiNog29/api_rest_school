import dotenv from 'dotenv';

dotenv.config();

import './src/database';

import express from 'express';
import homeRoutes from './src/routes/homeRoutes';
import userRoutes from './src/routes/userRoutes';
import tokensRoutes from './src/routes/tokenRoutes';
import studentRoutes from './src/routes/studentRoutes';
import picturephRoutes from './src/routes/pictureRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokensRoutes);
    this.app.use('/students/', studentRoutes);
    this.app.use('/pictures/', picturephRoutes);
  }
}

export default new App().app;
