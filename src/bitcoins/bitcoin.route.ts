import { Router } from 'express';
import Route from '../common/route.interface';
import validationMiddleware from '../common/validation.middleware';
import BitcoinController from './bitcoin.controller';
import { UpdateBitcoinDto } from './bitcoin.dto';

class BitcoinRoute implements Route {
  public path = '/bitcoin';
  public router = Router()
  private bitcoinController = new BitcoinController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}`, this.bitcoinController.getBitcoinPrice);
    this.router.put(`${this.path}`, validationMiddleware(UpdateBitcoinDto, 'body'), this.bitcoinController.setBitcoinPrice);
  }
}

export default BitcoinRoute;