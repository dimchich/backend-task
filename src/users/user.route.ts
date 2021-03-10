import { Router } from 'express';
import Route from '../common/route.interface';
import validationMiddleware from '../common/validation.middleware';
import UserController from './user.controller';
import { BalanceBitcoinDto, BalanceUsdDto, CreateUserDto, UpdateUserDro } from './user.dto';

class UserRoute implements Route {
  public path = '/users';
  public router = Router()
  private userController = new UserController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.userController.addUser);
    this.router.get(`${this.path}/:id(\\d+)`, this.userController.getUserById);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(UpdateUserDro, 'body', true), this.userController.updateUserById);
    this.router.post(`${this.path}/:id(\\d+)/usd`, validationMiddleware(BalanceUsdDto, 'body'), this.userController.updateUserUsdBalanceById);
    this.router.post(`${this.path}/:id(\\d+)/bitcoins`, validationMiddleware(BalanceBitcoinDto, 'body'), this.userController.updateUserBitcoinBalanceById);
    this.router.get(`${this.path}/:id(\\d+)/balance`, this.userController.getUserBalanceById);

  }
}

export default UserRoute;