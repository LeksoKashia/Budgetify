import { Transaction } from "./transaction.model";

export interface TransactionCategory {
  id?: number;
  type: string;
  name: string;
  transaction: Transaction;
}