import { Pool, QueryResult } from 'pg'
import { DutyRepository } from '../../infrastructure/repositories/DutyRepository'
import { Duty } from '../../domain/model/Duty'

jest.mock('pg', () => {
	const mPool = {
		query: jest.fn().mockImplementation((duty: QueryResult) => {}),
	}
	return { Pool: jest.fn(() => mPool) }
})

describe('DutyRepository', () => {
	let dutyRepository: DutyRepository
	let pool: jest.Mocked<Pool>

	beforeEach(() => {
		pool = new Pool() as jest.Mocked<Pool>
		dutyRepository = new DutyRepository(pool)
	})

	it('should find all duties', async () => {
		const rows = [{ id: '1', name: 'Test Duty', done: false, deleted: false }]
		const mockQueryResult: QueryResult = { rows } as QueryResult
		pool.query.mockImplementation(() => Promise.resolve(mockQueryResult))

		const result = await dutyRepository.findAll()
		expect(result).toEqual([new Duty('Test Duty', false, false, '1')])
		expect(pool.query).toHaveBeenCalledWith('SELECT * FROM duties WHERE deleted = false')
	})

	it('should find duty by id', async () => {
		const rows = [{ id: '1', name: 'Test Duty', done: false, deleted: false }]
		const mockQueryResult: QueryResult = { rows } as QueryResult
		pool.query.mockImplementation(() => Promise.resolve(mockQueryResult))

		const result = await dutyRepository.findById('1')
		expect(result).toEqual(new Duty('Test Duty', false, false, '1'))
		expect(pool.query).toHaveBeenCalledWith('SELECT * FROM duties WHERE id = $1 AND deleted = false', ['1'])
	})

	// Additional tests for create, update, delete can be added similarly

	it('should create a new duty', async () => {
		const duty = new Duty('New Duty', false, false)
		const mockQueryResult: QueryResult = { rows: [duty] } as unknown as QueryResult
		pool.query.mockImplementation(() => Promise.resolve(mockQueryResult))
		const result = await dutyRepository.create(duty)
		expect(result).toEqual(duty)
		expect(pool.query).toHaveBeenCalledWith('INSERT INTO duties (name, done, deleted) VALUES ($1, $2, $3) RETURNING *', ['New Duty', false, false])
	})

	it('should update an existing duty', async () => {
		const duty = new Duty('Updated Duty', true, false, '1')
		const mockQueryResult: QueryResult = { rows: [duty] } as unknown as QueryResult
		pool.query.mockImplementation(() => Promise.resolve(mockQueryResult))
		const result = await dutyRepository.update('1', duty)
		expect(result).toEqual(duty)
	})

	it('should delete an existing duty', async () => {
		const duty = new Duty('Updated Duty', true, false, '1')

		const mockQueryResult: QueryResult = { rows: [duty] } as unknown as QueryResult
		pool.query.mockImplementation(() => Promise.resolve(mockQueryResult))
		const result = await dutyRepository.delete('1')
		expect(result).toBe(false)
	})

	it('should handle errors when querying the database', async () => {
		const error = new Error('Database error')
		pool.query.mockImplementation(() => Promise.reject(error))

		await expect(dutyRepository.findAll()).rejects.toThrow('Database error')
		await expect(dutyRepository.findById('1')).rejects.toThrow('Database error')
		await expect(dutyRepository.create(new Duty('New Duty', false, false))).rejects.toThrow('Database error')
		await expect(dutyRepository.update('1', new Duty('Updated Duty', true, false, '1'))).rejects.toThrow('Database error')
		await expect(dutyRepository.delete('1')).rejects.toThrow('Database error')
	})
})
