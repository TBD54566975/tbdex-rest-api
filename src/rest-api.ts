import type { GetCallback, GetKind, SubmitCallback, SubmitKind } from './types.js'
import type { Express } from 'express'

import express from 'express'
import cors from 'cors'

import { getExchanges, getOfferings, submitOrder, submitClose, submitRfq } from './request-handlers/index.js'


export class RestApi {
  getCallbacks: Map<GetKind, GetCallback<GetKind>> = new Map()
  submitCallbacks: Map<SubmitKind, SubmitCallback<SubmitKind>> = new Map()
  api: Express

  constructor() {
    const api = express()

    api.use(cors())
    api.use(express.json())

    api.post('/exchanges/:exchangeId/rfq', submitRfq(this.submitCallbacks.get('rfq')))
    api.post('/exchanges/:exchangeId/order', submitOrder(this.submitCallbacks.get('order')))
    api.post('/exchanges/:exchangeId/close', submitClose(this.submitCallbacks.get('close')))
    api.get('/exchanges',getExchanges(this.getCallbacks.get('exchanges')))
    api.get('/offerings', getOfferings(this.getCallbacks.get('offerings')))

    this.api = api
  }

  submit<T extends SubmitKind>(messageKind: T, callback: SubmitCallback<T>) {
    this.submitCallbacks.set(messageKind, callback)
  }

  get<T extends GetKind>(resourceKind: T, callback: GetCallback<T>) {
    this.getCallbacks.set(resourceKind, callback)
  }
}