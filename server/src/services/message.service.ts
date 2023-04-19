import { messageModel } from '../models/message.model'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'

dayjs.extend(utc)
dayjs.extend(timezone)

const getAll = async () => {
  const messages = await messageModel.getAll()
  const returnMessages = messages.map((message) => {
    return {
      ...message,
      timestamp: dayjs(message.timestamp).tz('America/Sao_Paulo').format('DD/MM HH:mm'),
    }
  })

  return returnMessages
}

export const messageService = {
  getAll,
}
