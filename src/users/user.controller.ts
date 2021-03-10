import { NextFunction, Request, Response } from 'express';
import UserService from './user.service';
import HttpException from '../common/HttpException';
import { BalanceBitcoinDto, BalanceUsdDto, CreateUserDto, UpdateUserDro } from './user.dto';

class UserController {
  private userService = new UserService();

  public addUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const user = await this.userService.addUser(userData);
      res.status(201).json(UserService.toDto(user));
    } catch (error) {
      next(error);
    }
  }

  public getUserById = async (req: Request, res:Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const user = await this.userService.getUserById(userId);
      res.status(200).json(UserService.toDto(user));
    } catch (error) {
      next(error);
    }
  }

  public updateUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const userData: UpdateUserDro = req.body;
      const user = await this.userService.updateUserById(userId, userData);
      res.status(200).json(UserService.toDto(user));
    } catch (error) {
      next(error);
    }
  }

  public updateUserUsdBalanceById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const balanceData: BalanceUsdDto = req.body;
      const user = await this.userService.updateUserUsdBalanceById(userId, balanceData);
      res.status(200).json(UserService.toDto(user));
    } catch (error) {
      next(error)
    }
  }

  public updateUserBitcoinBalanceById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const balanceData: BalanceBitcoinDto = req.body;
      const user = await this.userService.updateUserBitcoinBalanceById(userId, balanceData);
      res.status(200).json(user);
    } catch (error) {
      next(error)
    }
  }

  public getUserBalanceById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.id);
      const balance = await this.userService.getUserBalanceById(userId);
      res.status(200).json({balance});
    } catch (error) {
      next(error)
    }
  }
}

export default UserController;
