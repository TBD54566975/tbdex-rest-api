import type { Request, Response } from 'express'
import type { ErrorResponse } from '@tbd54566975/tbdex'

import express from 'express'
import cors from 'cors'

import { Message } from '@tbd54566975/tbdex'

export const api = express()

api.use(cors())
api.use(express.json())

api.post('/exchanges/:exchangeId/rfq', async (req: Request, res: Response) => {
  let message

  try {
    message = await Message.parse(req.body)
  } catch(e) {
    console.log(e.message);
    return res.status(400).json({})
  }

  if (!message.isRfq()) {
    return res.status(400).json({ error: 'expected rfq' })
  }

  return res.sendStatus(501)
})

api.post('/exchanges/:exchangeId/order', (req: Request, res: Response) => {
  return res.sendStatus(501)
})
api.post('/exchanges/:exchangeId/close', (req: Request, res: Response) => {
  return res.sendStatus(501)
})
api.get('/exchanges/:exchangeId', (req: Request, res: Response) => {
  return res.sendStatus(501)
})
api.get('/exchanges', (req: Request, res: Response) => {
  return res.sendStatus(501)
})

api.get('/offerings', (req: Request, res: Response) => {
  return res.sendStatus(501)
})

// export class RestApi {
//   constructor() {}
// }