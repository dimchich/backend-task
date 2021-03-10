
import { Bitcoin } from './bitcoin.interface';
import { UpdateBitcoinDto, BitcoinDto } from './bitcoin.dto';
import HttpException from '../common/HttpException';
import { logger } from '../utils/logger';

class BitcoinService {
  private bitcoins:Bitcoin[] = [];

  static toDto(bitcoin: Bitcoin):BitcoinDto {
    const dto:BitcoinDto = {
      price: bitcoin.price,
      updatedAt: bitcoin.updatedAt,
    }
    return dto;
  }

  constructor() {
    const defaultCurrency:Bitcoin = {
      price: 100.00,
      updatedAt: new Date(),
    };
    this.bitcoins.push(defaultCurrency);
  }

  public getCurrentPrice = async():Promise<BitcoinDto> => {
    logger.verbose('getCurrentPrice called');
    return BitcoinService.toDto(this.bitcoins[this.bitcoins.length -1]);
  }

  public setNewPrice = async (newCurrency:UpdateBitcoinDto):Promise<BitcoinDto> => {
    logger.verbose('setNewPrice called');
    if (newCurrency.price <= 0) throw new HttpException(400, 'price must be a positive number')
    const newBitcoin:Bitcoin = {
      price: newCurrency.price,
      updatedAt: new Date(),
    };
    this.bitcoins.push(newBitcoin);
    logger.verbose('new price added');
    return BitcoinService.toDto(newBitcoin);
  }
}

export default new BitcoinService();