import { Encrypter } from 'src/data/protocols/encrypter';
import { AccountModel } from 'src/domain/models/account';
import { AddAccount, AddAccountModel } from 'src/domain/useCases/add-account';

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;

  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password);

    return new Promise((resolve) =>
      resolve({
        name: '',
        id: '',
        email: '',
        password: '',
      }),
    );
  }
}
