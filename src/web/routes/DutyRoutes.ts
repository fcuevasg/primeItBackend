import { Router } from 'express'
import { Pool } from 'pg'
import { DutyRepository } from '../../infrastructure/repositories/DutyRepository'
import { DutyService } from '../../domain/service/DutyService'
import { DutyController } from '../../infrastructure/controllers/DutyController'
import dotenv from 'dotenv'
dotenv.config()


const db = new Pool({
	connectionString: process.env.DATABASE_URL,
})

const dutyRepository = new DutyRepository(db)
const dutyService = new DutyService(dutyRepository)
const dutyController = new DutyController(dutyService)

const router = Router()

router.get('/duties', (req, res) => dutyController.getAllDuties(req, res))
router.get('/duties/:id', (req, res) => dutyController.getDutyById(req, res))
router.post('/duties', (req, res) => dutyController.createDuty(req, res))
router.put('/duties/:id', (req, res) => dutyController.updateDuty(req, res))
router.delete('/duties/:id', (req, res) => dutyController.deleteDuty(req, res))

export default router
