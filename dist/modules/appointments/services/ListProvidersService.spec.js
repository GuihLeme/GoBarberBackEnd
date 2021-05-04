"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _ListProvidersService = _interopRequireDefault(require("./ListProvidersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let listProviders;
let fakeCacheProvider;
describe('ListProviders ', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProviders = new _ListProvidersService.default(fakeUsersRepository, fakeCacheProvider);
  });
  it('should be to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    });
    const user2 = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'johnt@example.com',
      password: '123456'
    });
    const loggedUser = await fakeUsersRepository.create({
      name: 'Logged User',
      email: 'exemple@example.com',
      password: '000000'
    });
    const providers = await listProviders.execute({
      user_id: loggedUser.id
    });
    expect(providers).toEqual([user1, user2]);
  });
});