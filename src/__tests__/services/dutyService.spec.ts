import { Duty } from "../../domain/model/Duty";
import { DutyService } from "../../domain/service/DutyService";
import { DutyRepository } from "../../infrastructure/repositories/DutyRepository";

jest.mock('../../infrastructure/repositories/DutyRepository.ts');

const MockDutyRepository = DutyRepository as jest.Mock<DutyRepository>;

describe('DutyService', () => {
  let dutyService: DutyService;
  let dutyRepository: jest.Mocked<DutyRepository>;

  beforeEach(() => {
    dutyRepository = new MockDutyRepository() as jest.Mocked<DutyRepository>;
    dutyService = new DutyService(dutyRepository);
  });

  it('should get all duties', async () => {
    const duties = [new Duty( 'Test Duty 1', false, false)];
    dutyRepository.findAll.mockResolvedValue(duties);

    const result = await dutyService.getAllDuties();
    expect(result).toEqual(duties);
    expect(dutyRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should get duty by id', async () => {
    const duty = new Duty('Test Duty', false, false);
    dutyRepository.findById.mockResolvedValue(duty);

    const result = await dutyService.getDutyById('1');
    expect(result).toEqual(duty);
    expect(dutyRepository.findById).toHaveBeenCalledWith('1');
  });

  it('should create a new duty', async () => {
    const duty = new Duty('Test Duty', false, false);
    dutyRepository.create.mockResolvedValue(duty);

    const result = await dutyService.createDuty(duty);
    expect(result).toEqual(duty);
    expect(dutyRepository.create).toHaveBeenCalledWith(duty);
  });

  it('should update an existing duty', async () => {
    const duty = new Duty('Test Duty', false, false, '1');
    dutyRepository.update.mockResolvedValue(duty);

    const result = await dutyService.updateDuty("1",duty);
    expect(result).toEqual({ name: 'Test Duty', done: false, deleted: false, id: '1' });
    expect(dutyRepository.update).toHaveBeenCalledWith('1', duty);
  });

  it('should delete an existing duty', async () => {
    const dutyId = '1';
    dutyRepository.delete.mockResolvedValue(true);

    const result = await dutyService.deleteDuty(dutyId);
    expect(result).toBe(true);
    expect(dutyRepository.delete).toHaveBeenCalledWith(dutyId);
  });
  
});
