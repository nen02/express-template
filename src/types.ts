export interface GetAllUsersFilters {
  isDeleted?: boolean;
  includeDeleted?: boolean;
}

export interface IRepository<Input, Output> {
  create(payload: Input): Promise<Output>;
  update(id: number, payload: Partial<Input>): Promise<Output>;
  getById(id: number): Promise<Output | null>;
  getByUUID(uuid: string): Promise<Output | null>;
  deleteById(id: number): Promise<boolean>;
  all(): Promise<Output[]>;
}
