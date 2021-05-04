"use strict";

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _ListProviderDayAvailabilityService = _interopRequireDefault(require("./ListProviderDayAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentsRepository;
let listProviderDayAvailability;
describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    listProviderDayAvailability = new _ListProviderDayAvailabilityService.default(fakeAppointmentsRepository);
  });
  it('should be able to list day availability from a specific provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2021, 1, 5, 13, 0, 0)
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2021, 1, 5, 15, 0, 0)
    });
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 1, 5, 11).getTime();
    });
    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2021,
      month: 2,
      day: 5
    });
    expect(availability).toEqual(expect.arrayContaining([{
      hour: 8,
      available: false
    }, {
      hour: 9,
      available: false
    }, {
      hour: 10,
      available: false
    }, {
      hour: 11,
      available: false
    }, {
      hour: 12,
      available: true
    }, {
      hour: 13,
      available: false
    }, {
      hour: 14,
      available: true
    }, {
      hour: 15,
      available: false
    }, {
      hour: 16,
      available: true
    }, {
      hour: 17,
      available: true
    }]));
  });
});