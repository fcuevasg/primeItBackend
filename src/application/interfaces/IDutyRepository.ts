import { Duty } from "../../domain/model/Duty";

export interface IDutyRepository {
  save(duty: Duty): Promise<void>;
  findById(id: string): Promise<Duty | null>;
}
