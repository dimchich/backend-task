import { NextFunction, Request, Response } from 'express';
import HttpException from '../common/HttpException';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
  public test = async (req, res, next) => {
    try {
      setTimeout(() => {
        res.status(200).json({pong: "pong"});
      }, 5000)
    } catch (error) {
     next(error) 
    }
  }
}

export default IndexController;
