import { NextFunction, Request, Response } from 'express';
import bitcoinService from './bitcoin.service';
import { UpdateBitcoinDto, BitcoinDto } from './bitcoin.dto';

class BitcoinController {
  private bitcoinService = bitcoinService;


  public getBitcoinPrice = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const bitcoinPrice: BitcoinDto = await this.bitcoinService.getCurrentPrice();
      res.status(200).json(bitcoinPrice);
    } catch (error) {
      next(error);
    }
  }

  public setBitcoinPrice = async (req:Request, res:Response, next:NextFunction) => {
    try {
      const newBitcoinCurrency: UpdateBitcoinDto = req.body;
      const bitcoinPrice: BitcoinDto = await this.bitcoinService.setNewPrice(newBitcoinCurrency);
      res.status(200).json(bitcoinPrice);
    } catch (error) {
      next(error);
    }
  }  
}

export default BitcoinController;
