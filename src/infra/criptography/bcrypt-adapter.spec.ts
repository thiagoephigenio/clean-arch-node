import * as bcrypt from 'bcrypt';
import { BcrypterAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  ...jest.requireActual<typeof bcrypt>('bcrypt'),
  hash: (): Promise<string> =>
    new Promise((resolve) => resolve('hashed_value')),
}));

const salt = 12;
const makeSut = (): BcrypterAdapter => {
  return new BcrypterAdapter(salt);
};

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });

  test('Should return a hash on success', async () => {
    const sut = makeSut();
    const hash = await sut.encrypt('any_value');

    expect(hash).toBe('hashed_value');
  });
});
