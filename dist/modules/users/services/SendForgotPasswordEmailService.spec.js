"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

var _SendForgotPasswordEmailService = _interopRequireDefault(require("./SendForgotPasswordEmailService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeMailProvider;
let fakeUserTokensRepository;
let sendForgotenPasswordEmail;
describe('SendForgotPasswordEmail ', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeMailProvider = new _FakeMailProvider.default();
    fakeUserTokensRepository = new _FakeUserTokensRepository.default();
    sendForgotenPasswordEmail = new _SendForgotPasswordEmailService.default(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);
  });
  it('should be able to send recover the password using the user`s e-mail', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    });
    await sendForgotenPasswordEmail.execute({
      email: 'john@example.com'
    });
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to recover a non-existing user password', async () => {
    await expect(sendForgotenPasswordEmail.execute({
      email: 'john@example.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should to generate a forgoten password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    });
    await sendForgotenPasswordEmail.execute({
      email: 'john@example.com'
    });
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});