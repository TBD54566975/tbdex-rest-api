import type {
  GetCallback,
  GetCallbacks,
  GetKind,
  SubmitCallback,
  SubmitCallbacks,
  SubmitKind,
  OfferingsApi,
  ExchangesApi,
} from './types.js'

import type { Express } from 'express'

import express from 'express'
import cors from 'cors'

import { getExchanges, getOfferings, submitOrder, submitClose, submitRfq } from './request-handlers/index.js'
import { jsonBodyParser } from './middleware/index.js'
import { fakeExchangesApi, fakeOfferingsApi } from './fakes.js'

type RequestKind = GetKind | SubmitKind
type CallbackMap = {
  [Kind in RequestKind]?: Kind extends GetKind ? GetCallback<Kind>
    : Kind extends SubmitKind ? SubmitCallback<Kind>
    : never
}

type NewRestApiOptions = {
  offeringsApi?: OfferingsApi
  exchangesApi?: ExchangesApi
}

const defaults: NewRestApiOptions = {
  offeringsApi : fakeOfferingsApi,
  exchangesApi : fakeExchangesApi
}
export class RestApi {
  callbacks: CallbackMap = {}
  api: Express

  constructor(opts?: NewRestApiOptions) {
    opts = { ...defaults, ...opts }
    const { offeringsApi, exchangesApi } = opts
    const api = express()

    api.use(cors())
    api.use(jsonBodyParser())

    api.post('/exchanges/:exchangeId/rfq', submitRfq({
      callback: this.callbacks['rfq'], offeringsApi, exchangesApi,
    }))

    api.post('/exchanges/:exchangeId/order', submitOrder({
      callback: this.callbacks['order'], exchangesApi
    }))

    api.post('/exchanges/:exchangeId/close', submitClose({
      callback: this.callbacks['close'], exchangesApi
    }))

    api.get('/exchanges', getExchanges({
      callback: this.callbacks['exchanges'], exchangesApi
    }))

    api.get('/offerings', getOfferings({
      callback: this.callbacks['offerings'], offeringsApi
    }))

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