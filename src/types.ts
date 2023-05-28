import { Request } from "express";

export interface GetAllUsersFilters {
  isDeleted?: boolean;
  includeDeleted?: boolean;
}

export interface AuthRequest extends Request {
  user?: {
    id: number;
    uuid: string;
    username: string;
    firstName: string;
    lastName: string;
  };
}

export interface IRepository<Input, Output> {
  create(payload: Input): Promise<Output>;
  update(id: number, payload: Partial<Input>): Promise<Output>;
  getById(id: number): Promise<Output | null>;
  deleteById(id: number): Promise<boolean>;
  all(): Promise<Output[]>;
}
