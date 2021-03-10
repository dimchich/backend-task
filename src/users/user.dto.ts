import { IsEmail, IsIn, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public name:string;

  @IsString()
  @IsNotEmpty()
  public username:string;

  @IsEmail()
  @IsNotEmpty()
  public email:string;
}

export class UpdateUserDro {
  @IsString()
  @IsNotEmpty()
  public name:string;

  @IsEmail()
  @IsNotEmpty()
  public email:string;
}

export class UserDto {
  public id: number;
  public name: string;
  public username: string;
  public email: string;
  public bitcoinAmount: number;
  public usdBalance: number;
  public createdAt: Date;
  public updatedAt: Date;
}

export class BalanceUsdDto {
  @IsIn(['withdraw', 'deposit'])
  @IsString()
  @IsNotEmpty()
  public action: 'withdraw'|'deposit';

  @IsPositive()
  @IsNotEmpty()
  public amount: number;
}

export class BalanceBitcoinDto {
  @IsIn(['buy', 'sell'])
  @IsString()
  @IsNotEmpty()
  public action: 'buy'|'sell';

  @IsPositive()
  @IsNotEmpty()
  public amount: number;
}