import { NextFunction, Request, Response } from 'express';
import util from 'util';
import HttpException from './HttpException';
import { logger } from '../utils/logger';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    logger.log('error', `Request: ${req.url}, \n body: ${util.inspect(req.body)} \n StatusCode : ${status}, Message : ${message} \n ${error.stack}`);
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
