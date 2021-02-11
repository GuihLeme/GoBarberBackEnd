import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProviderService;

describe('ListProviders ', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProviderService(fakeUsersRepository);
  });

  it('should be to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'johnt@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Logged User',
      email: 'exemple@example.com',
      password: '000000',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
