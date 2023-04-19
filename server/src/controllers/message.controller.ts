import { Request, Response } from 'express'
import { messageModel } from '../models/message.model'

const getAll = async (_req: Request, res: Response) => {
  try {
    const messages = await messageModel.getAll()
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const messageController = {
  getAll,
}
