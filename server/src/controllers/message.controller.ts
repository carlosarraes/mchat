import { Request, Response } from 'express'
import { messageService } from '../services'

const find = async (_req: Request, res: Response) => {
  try {
    const messages = await messageService.getAll()
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const messageController = {
  find,
}
