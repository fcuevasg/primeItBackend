import { Duty } from "../../domain/model/Duty";

describe('Duty Model', () => {
  it('should create a duty instance', () => {
    const duty = new Duty('Test Duty', false, false);
    expect(duty.id).toBe(undefined);
    expect(duty.name).toBe('Test Duty');
    expect(duty.done).toBe(false);
    expect(duty.deleted).toBe(false);
  });
});
