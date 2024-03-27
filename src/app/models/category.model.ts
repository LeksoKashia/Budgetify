import { Account } from "./account.model";

export interface Category {
  id?: number;
  type: string;
  name: string;
  account: Account;
}