import { Request, Response } from 'express'
import { DutyService } from '../../domain/service/DutyService'
import { Duty } from '../../domain/model/Duty'
import Logger from '../../Logger/Logger'

export class DutyController {
	constructor(private dutyService: DutyService) {}

	async getAllDuties(req: Request, res: Response): Promise<void> {
		try {
			const duties: Duty[] = await this.dutyService.getAllDuties()
			Logger.debug('[Controller]: all duties retrieved')
			res.json(duties)
		} catch (error: any) {
			Logger.error('[Controller]: failed to retrieve all duties')
			Logger.error(`[Controller]: error: ${error.message}`)

			res.status(500).json({ error: error.message })
		}
	}

	async getDutyById(req: Request, res: Response): Promise<void> {
		try {
			const duty: Duty | null = await this.dutyService.getDutyById(req.params.id)
			if (duty) {
				Logger.debug(`[Controller]: duty ${req.params.id} retrieved`)
				res.json(duty)
			} else {
				Logger.info(`[Controller]: duty ${req.params.id} not found`)
				res.status(404).json({ error: 'Duty not found' })
			}
		} catch (error: any) {
			Logger.error(`[Controller]: failed to retrieve duty ${req.params.id}`)
			Logger.error(`[Controller]: error: ${error.message}`)

			res.status(500).json({ error: error.message })
		}
	}

	async createDuty(req: Request, res: Response): Promise<void> {
		try {
			const duty: Duty = new Duty(req.body.name, req.body.done, req.body.deleted)
			const newDuty: Duty = await this.dutyService.createDuty(duty)
			Logger.debug(`[Controller]: duty created, id: ${newDuty.id}`)
			res.status(201).json(newDuty)
		} catch (error: any) {
			Logger.error('[Controller]: failed to create duty')
			Logger.error(`[Controller]: error: ${error.message}`)

			res.status(500).json({ error: error.message })
		}
	}

	async updateDuty(req: Request, res: Response): Promise<void> {
		try {
			const updatedDuty: Duty | null = await this.dutyService.updateDuty(req.params.id, req.body)
			if (updatedDuty) {
				Logger.debug(`[Controller]: duty ${req.params.id} updated`)
				res.json(updatedDuty)
			} else {
				Logger.info(`[Controller]: duty ${req.params.id} not found`)
				res.status(404).json({ error: 'Duty not found' })
			}
		} catch (error: any) {
			Logger.error(`[Controller]: failed to update duty ${req.params.id}`)
			Logger.error(`[Controller]: error: ${error.message}`)

			res.status(500).json({ error: error.message })
		}
	}

	async deleteDuty(req: Request, res: Response): Promise<void> {
		try {
			const success: boolean = await this.dutyService.deleteDuty(req.params.id)
			if (success) {
				Logger.debug(`[Controller]: duty ${req.params.id} deleted`)
				res.status(204).send()
			} else {
				Logger.info(`[Controller]: duty ${req.params.id} not found`)
				res.status(404).json({ error: 'Duty not found' })
			}
		} catch (error: any) {
			Logger.error(`[Controller]: failed to delete duty ${req.params.id}`)
			Logger.error(`[Controller]: error: ${error.message}`)

			res.status(500).json({ error: error.message })
		}
	}
}
