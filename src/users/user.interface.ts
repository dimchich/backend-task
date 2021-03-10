export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  bitcoinAmount: number;
  usdBalance: number;
  createdAt: Date;
  updatedAt: Date;
}