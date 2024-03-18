import { Transaction } from "./Transaction.model";

export interface ImageModel {
  id?: number;
  fileName: string;
  filePath: string;
  transaction: Transaction;
}