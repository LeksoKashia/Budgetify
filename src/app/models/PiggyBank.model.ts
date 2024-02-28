import { Account } from "./Account.model";

export interface PiggyBank {
  id?: number;
  account: Account;
  goal: string;
  goalAmount: number;
  savedAmount: number;
}