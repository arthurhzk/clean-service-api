import bcrypt from "bcrypt"
export class BcryptAdapter {
  async hashPassword(password: string, salt: number): Promise<string> {
    return bcrypt.hash(password, salt)
  }
  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}
