export interface IAuthService {
  addUser(username: string, password: string): Promise<IDBValidKey>;
  getUser(username: string): Promise<{ username: string, password: string } | undefined>;
  validateUser(username: string, password: string): Promise<boolean>;
}