import express from 'express'
import { messageController } from '../controllers'

const router = express.Router()

router.get('/', messageController.getAll)

export default router
