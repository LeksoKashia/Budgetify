import { Transaction } from "./transaction.model";

export interface ImageModel {
  id?: number;
  fileName: string;
  filePath: string;
  transaction: Transaction;
}