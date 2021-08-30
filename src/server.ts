import 'express-async-errors';
import dotenv from 'dotenv-safe';
import express from 'express';
import middlewares from '@config/express';
import routes from '@config/routes';
import http from 'http';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

class Server {
  public app: express.Application;
  public server: http.Server;
  public port: number;

  constructor() {
    dotenv.config();
    this.app = express();
    this.port = parseInt(process.env.PORT);
    this.server = http.createServer(this.app);
    this.init();
  }

  async init() {
    try {
      await createConnection();

      middlewares(this.app);
      routes(this.app);

      if (require.main === module) {
        this.server.listen(this.port, () => {
          console.info(`Listening at http://localhost:${this.port}`);
        });
      }
    } catch (error) {
      console.error({ error });
    }
  }
}

export default new Server();