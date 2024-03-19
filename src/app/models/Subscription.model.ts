import { Account } from "./account.model";

export interface Subscription {
  id?: number;
  account: Account;
  title: string;
  categories: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  description:string;
}