import { Request, Response } from 'express'
import { Duty } from '../../domain/model/Duty'
import { DutyService } from '../../domain/service/DutyService'
import { DutyController } from '../../infrastructure/controllers/DutyController'
import Logger from '../../Logger/Logger'

jest.mock('../../domain/service/DutyService')

const MockDutyService = DutyService as jest.Mock<DutyService>

const mockLogError = jest.spyOn(Logger, 'error')

describe('DutyController', () => {
	let dutyController: DutyController
	let dutyService: jest.Mocked<DutyService>
	let req: Partial<Request>
	let res: Partial<Response>

	beforeEach(() => {
		dutyService = new MockDutyService() as jest.Mocked<DutyService>
		dutyController = new DutyController(dutyService)
		req = {}
		res = {
			json: jest.fn().mockReturnThis(),
			status: jest.fn().mockReturnThis(),
			send: jest.fn(),
		}
	})

	afterEach(() => {
		mockLogError.mockReset()
	})

	it('should get all duties', async () => {
		const duties = [new Duty('Test Duty', false, false)]
		dutyService.getAllDuties.mockResolvedValue(duties)

		await dutyController.getAllDuties(req as Request, res as Response)
		expect(res.json).toHaveBeenCalledWith(duties)
	})

	it('should handle error when getting all duties', async () => {
		mockLogError.mockImplementation(() => {})
		const errorMessage = '[Controller]: failed to retrieve all duties'
		dutyService.getAllDuties = jest.fn().mockRejectedValue(new Error(errorMessage))
		await dutyController.getAllDuties(req as Request, res as Response)
		expect(mockLogError).toHaveBeenCalledWith(errorMessage)
		expect(res.status).toHaveBeenCalledWith(500)
	})

	it('should get duty by id', async () => {
		const duty = new Duty('Test Duty', false, false)
		dutyService.getDutyById.mockResolvedValue(duty)
		req.params = { id: '1' }

		await dutyController.getDutyById(req as Request, res as Response)
		expect(res.json).toHaveBeenCalledWith(duty)
	})

	it('should handle error when getting duty by id', async () => {
		mockLogError.mockImplementation(() => {})
		const errorMessage = '[Controller]: failed to retrieve duty 1'
		dutyService.getDutyById.mockRejectedValue(new Error(errorMessage))
		req.params = { id: '1' }

		await dutyController.getDutyById(req as Request, res as Response)
		expect(mockLogError).toHaveBeenCalledWith(errorMessage)
		expect(res.status).toHaveBeenCalledWith(500)
	})

	it('should create duty', async () => {
		const duty = new Duty('Test Duty', false, false)
		dutyService.createDuty.mockResolvedValue(duty)
		req.body = { name: 'Test Duty', completed: false, archived: false }

		await dutyController.createDuty(req as Request, res as Response)
		expect(res.json).toHaveBeenCalledWith(duty)
	})

	it('should handle error when creating duty', async () => {
		mockLogError.mockImplementation(() => {})
		const errorMessage = '[Controller]: failed to create duty'

		dutyService.createDuty.mockRejectedValue(new Error(errorMessage))
		req.body = { name: 'Test Duty', completed: false, archived: false }

		await dutyController.createDuty(req as Request, res as Response)
		expect(res.status).toHaveBeenCalledWith(500)
		expect(mockLogError).toHaveBeenCalledWith(errorMessage)
	})

	it('should update duty', async () => {
		const duty = new Duty('Test Duty', false, false)
		dutyService.updateDuty.mockResolvedValue(duty)
		req.params = { id: '1' }
		req.body = { name: 'Updated Duty', completed: true, archived: false }

		await dutyController.updateDuty(req as Request, res as Response)
		expect(res.json).toHaveBeenCalledWith(duty)
	})

	it('should handle error when updating duty', async () => {
		mockLogError.mockImplementation(() => {})

		const errorMessage = '[Controller]: failed to update duty 1'
		dutyService.updateDuty.mockRejectedValue(new Error(errorMessage))
		req.params = { id: '1' }
		req.body = { name: 'Updated Duty', completed: true, archived: false }

		await dutyController.updateDuty(req as Request, res as Response)
		expect(res.status).toHaveBeenCalledWith(500)
		expect(mockLogError).toHaveBeenCalledWith(errorMessage)
	})

	it('should delete duty', async () => {
		const duty = new Duty('Test Duty', false, false)
		dutyService.deleteDuty.mockResolvedValue(true)
		req.params = { id: '1' }

		await dutyController.deleteDuty(req as Request, res as Response)
		expect(res.status).toHaveBeenCalledWith(204)
	})

	it('should handle error when deleting duty', async () => {
		mockLogError.mockImplementation(() => {})

		const errorMessage = '[Controller]: failed to delete duty 1'
		dutyService.deleteDuty.mockRejectedValue(new Error(errorMessage))
		req.params = { id: '1' }

		await dutyController.deleteDuty(req as Request, res as Response)
		expect(res.status).toHaveBeenCalledWith(500)
    expect(mockLogError).toHaveBeenCalledWith(errorMessage)

	})
})
