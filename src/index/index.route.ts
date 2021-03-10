import { Router } from 'express';
import Route from "../common/route.interface";
import IndexController from './index.controller';

class IndexRoute implements Route {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
    this.router.get(`${this.path}test`, this.indexController.test);
  }
}

export default IndexRoute;
