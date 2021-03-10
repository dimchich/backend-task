import { User } from './user.interface';
import { BalanceBitcoinDto, BalanceUsdDto, CreateUserDto, UpdateUserDro, UserDto } from './user.dto';
import bitcoinService from '../bitcoins/bitcoin.service';
import HttpException from '../common/HttpException';
import { logger } from '../utils/logger';

class  UserService {
  private bitcoinService = bitcoinService;
  private users:User[] = [];
  private id:number = 1;

  static toDto (user:User):UserDto {
    const dto:UserDto = {...user};
    return dto;
  }

  private getIndexById = async (id: number):Promise<number> => {
    return this.users.findIndex(user => {
      return user.id === id;
    })
  }

  public addUser = async (userData:CreateUserDto):Promise<User> => {
    logger.verbose('addUser called');
    const user: User = {
      ...userData,
      id: this.id,
      bitcoinAmount: 0,
      usdBalance: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.users.push(user);
    this.id += 1;
    // There is no requirement to check for the uniqueness of props
    logger.verbose('new user created');
    return user;
  }

  public getUserById = async (id:number):Promise<User> => {
    if(id <= 0) throw new HttpException(400, 'id must be positive number');
    logger.verbose('getUserById called');
    const user = this.users.find(user => {
      return user.id === id;
    })
    if(!user) throw new HttpException(404, 'User not found');
    return user;
  }

  public updateUserById = async (id:number, userData:UpdateUserDro):Promise<User> => {
    logger.verbose('updateUserById called');
    const user = await this.getUserById(id);
    const index = await this.getIndexById(id);
    user.name = userData?.name || user.name;
    user.email = userData?.email || user.email;
    user.updatedAt = new Date();
    this.users[index] = user;
    logger.verbose('user updated');
    return user;
  }

  public updateUserUsdBalanceById = async (id:number, balanceData: BalanceUsdDto):Promise<User> => {
    logger.verbose('updateUserUsdBalanceById called');
    const user = await this.getUserById(id);
    const index = await this.getIndexById(id);
    if (balanceData.action === 'withdraw') {
      const currentBalance = user.usdBalance;
      if (currentBalance - balanceData.amount < 0) throw new HttpException(400, 'Amount too big, not enough usd');
      user.usdBalance -= balanceData.amount;
    } else if (balanceData.action === 'deposit'){
      user.usdBalance += balanceData.amount;
    }
    user.updatedAt = new Date();
    this.users[index] = user;
    logger.verbose('user usd balance updated');
    return user;
  }


  public updateUserBitcoinBalanceById = async (id: number, balanceData: BalanceBitcoinDto):Promise<User> => {
    logger.verbose('updateUserBitcoinBalanceById called');
    const user = await this.getUserById(id);
    const index = await this.getIndexById(id);
    const rateData = await this.bitcoinService.getCurrentPrice();
    if (balanceData.action === 'buy') {
      const currentUsdBalance = user.usdBalance;
      if (currentUsdBalance - rateData.price * balanceData.amount < 0) throw new HttpException(400, 'Amount too big, not enough usd');
      user.usdBalance -= rateData.price * balanceData.amount;
      user.bitcoinAmount += balanceData.amount;
    } else if (balanceData.action === 'sell') {
      const currentbitcoinBalance = user.bitcoinAmount;
      if (currentbitcoinBalance - balanceData.amount < 0) throw new HttpException(400, 'Amount too big, not enough bitcoins');
      user.usdBalance += rateData.price * balanceData.amount;
      user.bitcoinAmount -= balanceData.amount;
    }
    user.updatedAt = new Date();
    this.users[index] = user;
    logger.verbose('user bitcoin balance updated');
    return user;
  }
  
  public getUserBalanceById = async (id: number):Promise<number> => {
    logger.verbose('getUserBalanceById called');
    const user = await this.getUserById(id);
    const rateData = await this.bitcoinService.getCurrentPrice();
    return user.bitcoinAmount*rateData.price + user.usdBalance;
  }
}

export default UserService;
