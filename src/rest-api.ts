import type { GetCallback, GetCallbacks, GetKind, SubmitCallback, SubmitCallbacks, SubmitKind } from './types.js'
import type { Express } from 'express'

import express from 'express'
import cors from 'cors'

import { getExchanges, getOfferings, submitOrder, submitClose, submitRfq } from './request-handlers/index.js'
import { jsonBodyParser } from './middleware/index.js'

type RequestKind = GetKind | SubmitKind
type CallbackMap = {
  [Kind in RequestKind]?: Kind extends GetKind ? GetCallback<Kind>
    : Kind extends SubmitKind ? SubmitCallback<Kind>
    : never
}
export class RestApi {
  callbacks: CallbackMap = {}
  api: Express

  constructor() {
    const api = express()

    api.use(cors())
    api.use(jsonBodyParser())

    api.post('/exchanges/:exchangeId/rfq', submitRfq(this.callbacks['rfq']))
    api.post('/exchanges/:exchangeId/order', submitOrder(this.callbacks['order']))
    api.post('/exchanges/:exchangeId/close', submitClose(this.callbacks['close']))
    api.get('/exchanges', getExchanges(this.callbacks['exchanges']))
    api.get('/offerings', getOfferings(this.callbacks['offerings']))

    this.api = api
  }

  submit<T extends SubmitKind>(messageKind: T, callback: SubmitCallbacks[T]) {
    this.callbacks[messageKind] = callback
  }

  get<T extends GetKind>(resourceKind: T, callback: GetCallbacks[T]) {
    this.callbacks[resourceKind] = callback
  }

  listen(port: number | string) {
    return this.api.listen(port)
  }
}