import { DutyRepository } from "../../infrastructure/repositories/DutyRepository";
import { Duty } from "../model/Duty";

export class DutyService {
  constructor(private dutyRepository: DutyRepository) {}

  async getAllDuties(): Promise<Duty[]> {
    return this.dutyRepository.findAll();
  }

  async getDutyById(id: string): Promise<Duty | null> {
    return this.dutyRepository.findById(id);
  }

  async createDuty(duty: Duty): Promise<Duty> {
    return this.dutyRepository.create(duty);
  }

  async updateDuty(id: string, duty: Partial<Duty>): Promise<Duty | null> {
    return this.dutyRepository.update(id, duty);
  }

  async deleteDuty(id: string): Promise<boolean> {
    return this.dutyRepository.delete(id);
  }
}
