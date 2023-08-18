import { DbAddAccount } from './db-add-account';

describe('DbAccount UseCase', () => {
  test('Should call Encripter with correct password', () => {
    class EncrypterStub {
      async encrypt(value: string): Promise<string> {
        return new Promise((resolve) => resolve('hased_password'));
      }
    }

    const encryptStub = new EncrypterStub();
    const sut = new DbAddAccount(encryptStub);
    const encryptSpy = jest.spyOn(encryptStub, 'encrypt');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    };

    sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });
});
