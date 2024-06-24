import { Pool } from 'pg'
import { Duty } from '../../domain/model/Duty'

export class DutyRepository {
	constructor(private db: Pool) {}

	async findAll(): Promise<Duty[]> {
		const result = await this.db.query('SELECT * FROM duties WHERE deleted = false')
		return result.rows.map((row) => new Duty(row.name, row.done, row.deleted, row.id))
	}

	async findById(id: string): Promise<Duty | null> {
		const result = await this.db.query('SELECT * FROM duties WHERE id = $1 AND deleted = false', [id])
		if (result.rows.length > 0) {
			const row = result.rows[0]
			return new Duty(row.name, row.done, row.deleted,row.id)
		}
		return null
	}
	async create(duty: Duty): Promise<Duty> {
		const result = await this.db.query('INSERT INTO duties (name, done, deleted) VALUES ($1, $2, $3) RETURNING *', [duty.name, duty.done, duty.deleted])
		const row = result.rows[0]
		return new Duty(row.name, row.done, row.deleted,row.id)
	}

	async update(id: string, duty: Partial<Duty>): Promise<Duty | null> {
		const updates = Object.keys(duty)
			.map((key, i) => `${key} = $${i + 2}`)
			.join(', ')
		const values = [id, ...Object.values(duty)]
		const result = await this.db.query(`UPDATE duties SET ${updates} WHERE id = $1 RETURNING *`, values)
		if (result.rows.length > 0) {
			const row = result.rows[0]
			return new Duty(row.name, row.done, row.deleted,row.id)
		}
		return null
	}

	async delete(id: string): Promise<boolean> {
		const result = await this.db.query('UPDATE duties SET deleted = true WHERE id = $1', [id])
		if (result && result.rowCount) return result.rowCount > 0
		return false
	}
}
