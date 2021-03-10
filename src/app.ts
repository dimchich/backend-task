import express, { NextFunction, Request, Response } from 'express';
import { Server } from 'http';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import Routes from './common/route.interface';
import { logger, stream } from './utils/logger';
import errorMiddleware from './common/error.middleware';
import HttpException from './common/HttpException';

class App {
  private app: express.Application;
  private port: string | number;
  private env: string;
  private server: Server;

  constructor(routes:Routes[]) {
    this.app = express();
    this.port = process.env.PORT;
    this.env = process.env.NODE_ENV;

    this.initMiddlewares();
    this.initRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  private initMiddlewares():void {
    this.app.use(morgan('combined', { stream }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeErrorHandling():void {
    this.app.use('/', (req: Request, res: Response, next: NextFunction) => {
      next(new HttpException(404, 'url not found'));
    })
    this.app.use(errorMiddleware);
  }

  private initRoutes(routes:Routes[]):void {
    routes.forEach(route => {
      this.app.use('/', route.router);
    })
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        openapi: '3.0.0',
        info: {
          title: 'Task API',
          version: '0.0.0',
          description: 'Api docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  public listen():Server {
    this.server = this.app.listen(this.port, () => {
      logger.info(`app listen on port ${this.port}`);
    })
    return this.server;
  }
  
}

export default App;
