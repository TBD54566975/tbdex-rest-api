import type {
  GetCallback,
  GetCallbacks,
  GetKind,
  SubmitCallback,
  SubmitCallbacks,
  SubmitKind,
  OfferingsApi,
  ExchangeApi,
  QuoteApi,
  OrderApi,
  CloseApi,
  RfqApi
} from './types.js'

import type { Express } from 'express'

import express from 'express'
import cors from 'cors'

import { getExchanges, getOfferings, submitOrder, submitClose, submitRfq } from './request-handlers/index.js'
import { jsonBodyParser } from './middleware/index.js'
import { fakeOfferingsApi } from './fakes.js'

type RequestKind = GetKind | SubmitKind
type CallbackMap = {
  [Kind in RequestKind]?: Kind extends GetKind ? GetCallback<Kind>
    : Kind extends SubmitKind ? SubmitCallback<Kind>
    : never
}

type NewRestApiOptions = {
  offeringsApi: OfferingsApi
}
export class RestApi {
  callbacks: CallbackMap = {}
  offeringsApi: OfferingsApi
  exchangeApi: ExchangeApi
  rfqApi: RfqApi
  quoteApi: QuoteApi
  orderApi: OrderApi
  closeApi: CloseApi
  api: Express

  constructor(opts: NewRestApiOptions = {
    offeringsApi: fakeOfferingsApi
  }) {
    const api = express()

    api.use(cors())
    api.use(jsonBodyParser())

    api.post('/exchanges/:exchangeId/rfq', submitRfq(this.callbacks['rfq'], this.offeringsApi, this.quoteApi, this.rfqApi))
    api.post('/exchanges/:exchangeId/order', submitOrder(this.callbacks['order'], this.quoteApi, this.orderApi))
    api.post('/exchanges/:exchangeId/close', submitClose(this.callbacks['close'], this.closeApi))
    api.get('/exchanges', getExchanges(this.callbacks['exchanges'], this.exchangeApi))
    api.get('/offerings', getOfferings(this.callbacks['offerings'], this.offeringsApi))

    this.api = api

    this.offeringsApi = opts.offeringsApi
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