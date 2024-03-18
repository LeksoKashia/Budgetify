import { Account } from "./Account.model";

export interface Transaction {
  id?: number;
  account: Account;
  type: string;
  title: string;
  categories: string;
  amount: number;
  paymentDate: Date;
  payee: string;
  description: string;
}