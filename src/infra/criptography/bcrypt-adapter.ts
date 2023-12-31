import { Encrypter } from 'src/data/protocols/encrypter';
import * as bcrypt from 'bcrypt';

export class BcrypterAdapter implements Encrypter {
  private readonly salt: number;

  constructor(salt: number) {
    this.salt = salt;
  }

  async encrypt(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);

    return hash;
  }
}
