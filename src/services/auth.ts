import { initDB } from "@/utils/db.ts";
import { IAuthService } from "@/types/auth-service";
import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;
const STORE_NAME = 'users'

class AuthService implements IAuthService {
  public async addUser(username: string, password: string): Promise<IDBValidKey> {
    const db = await initDB();

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    return db.put(STORE_NAME, {
      username,
      password: hashedPassword
    });
  }

  public async getUser(username: string): Promise<{ username: string; password: string } | undefined> {
    const db = await initDB();
    return db.get(STORE_NAME, username);
  }

  public async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.getUser(username);
    if (!user) return false;

    return bcrypt.compare(password, user.password);
  }
}

export default new AuthService();