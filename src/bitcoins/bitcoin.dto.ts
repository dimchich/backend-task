import { IsDecimal, IsDate, IsPositive, IsNotEmpty } from 'class-validator';

export class UpdateBitcoinDto {
  @IsPositive()
  @IsNotEmpty()
  public price: number;
}

export class BitcoinDto {
  @IsDecimal()
  public price: number;

  @IsDate()
  public updatedAt: Date;
}