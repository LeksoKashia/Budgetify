import { Account } from "./Account.model";

export interface Obligatory {
  id?: number;
  account: Account;
  title: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  description:string;
}