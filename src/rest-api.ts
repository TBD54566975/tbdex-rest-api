import type { Express, Request, Response } from 'express'
import type { ErrorDetail, MessageKind } from '@tbd54566975/tbdex'

import express from 'express'
import cors from 'cors'

import { Message } from '@tbd54566975/tbdex'


// type NewRestApiOptions = {
//   allowList?: string[]
//   offeringsApi: OfferingApi
// }

type RequestContext = {
  request: Request
  response: Response
}

type GetKind = 'exchanges' | 'offerings'
type SubmitKind = 'rfq' | 'order' | 'close'
type SubmitCallback<T extends SubmitKind> = (ctx: RequestContext, message: Message<T>) => any
type GetCallback<T extends GetKind> = (ctx: RequestContext, filter: Filters[T]) => any

type Filters = {
  'offerings': GetOfferingsFilter
  'exchanges': GetExchangesFilter
}

type GetOfferingsFilter = {
  baseCurrency: string
  quoteCurrency: string
}

type GetExchangesFilter = {
  ids: string[]
}

export class RestApi {
  getCallbacks: Map<GetKind, GetCallback<GetKind>> = new Map()
  submitCallbacks: Map<SubmitKind, SubmitCallback<SubmitKind>> = new Map()
  api: Express

  constructor() {
    this.api = express()
    this.api.use(cors())
    this.api.use(express.json())

    this.api.post('/exchanges/:exchangeId/rfq', async (req: Request, res: Response) => {
      let message: Message<MessageKind>

      try {
        message = await Message.parse(req.body)
      } catch(e) {
        const errorResponse: ErrorDetail = { detail: e.message }
        return res.status(400).json({ errors: [errorResponse] })
      }

      // TODO: check message.from against allowlist

      if (!message.isRfq()) {
        const errorResponse: ErrorDetail = { detail: 'expected request body to be a valid rfq' }
        return res.status(400).json({ errors: [errorResponse] })
      }

      const rfqCallback = this.submitCallbacks.get('rfq')
      if (rfqCallback) {
        let result;
        try {
          result = await rfqCallback({ request: req, response: res }, message)
        } catch(e) {
          // TODO: handle error lewl
        }

        // TODO: handle result and return appropriate response
      }

      // TODO: we need to check if the exchangeId already exists.
      // TODO: fetch offering based on rfq.offeringId
      // TODO: validate rfq based on offering using rfq.verifyOfferingRequirements(offering)

      return res.sendStatus(501)
    })

    this.api.post('/exchanges/:exchangeId/order', (req: Request, res: Response) => {
      return res.sendStatus(501)
    })
    this.api.post('/exchanges/:exchangeId/close', (req: Request, res: Response) => {
      return res.sendStatus(501)
    })
    this.api.get('/exchanges/:exchangeId', (req: Request, res: Response) => {
      return res.sendStatus(501)
    })
    this.api.get('/exchanges', (req: Request, res: Response) => {
      return res.sendStatus(501)
    })

    this.api.get('/offerings', (req: Request, res: Response) => {
      console.log('heyo!');
      return res.sendStatus(501)
    })
  }

  submit<T extends SubmitKind>(messageKind: T, callback: SubmitCallback<T>) {
    this.submitCallbacks.set(messageKind, callback)
  }

  get<T extends GetKind>(resourceKind: T, callback: GetCallback<T>) {
    this.getCallbacks.set(resourceKind, callback)
  }
}