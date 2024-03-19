import { User } from "./user.model";

export interface Account {
  id?: number;
  user: User;
  title: string;
  currency: string;
  balance: number;
  description: string;
  isActive?: boolean; 
}