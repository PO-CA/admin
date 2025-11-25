import { PocaCreditType } from './pocaCredit';

export interface AdjustPocaCreditDTO {
  userId: number;
  amount: number;
  creditType: PocaCreditType;
  description: string;
}
