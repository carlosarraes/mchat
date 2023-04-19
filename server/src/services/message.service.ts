import { messageModel } from '../models/message.model'
import dayjs from 'dayjs'

const getAll = async () => {
  const messages = await messageModel.getAll()
  const returnMessages = messages.map((message) => {
    return {
      ...message,
      timestamp: dayjs(message.timestamp).format('DD/MM HH:mm'),
    }
  })

  return returnMessages
}

export const messageService = {
  getAll,
}
