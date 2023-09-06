import type { ErrorDetail, MessageKind } from '@tbd54566975/tbdex'
import type { SubmitCallback, RequestHandler, QuoteApi, OrderApi } from '../types.js'

import { Message } from '@tbd54566975/tbdex'

export function submitOrder(callback: SubmitCallback<'order'>, quoteApi: QuoteApi, orderApi: OrderApi): RequestHandler {
  return async function (req, res) {
    let message: Message<MessageKind>

    try {
      message = await Message.parse(req.body)
    } catch(e) {
      const errorResponse: ErrorDetail = { detail: e.message }
      return res.status(400).json({ errors: [errorResponse] })
    }

    if (!message.isOrder()) {
      const errorResponse: ErrorDetail = { detail: 'expected request body to be a valid order' }
      return res.status(400).json({ errors: [errorResponse] })
    }

    // TODO: get most recent message added to exchange. use that to see if order is allowed
    // get the quote that the order is associated with
    const quote = await quoteApi.getQuote(message.exchangeId)
    if(quote == undefined) {
      return res.sendStatus(404)
    }

    try {
      await orderApi.createOrder(quote.id)
    } catch(e) {
      // if e.type == order already exists
      return res.sendStatus(409)
    }

    if (!callback) {
      // TODO: figure out what to do
      return res.sendStatus(202)
    }

    let result;
    try {
      result = await callback({ request: req, response: res }, message)
    } catch(e) {
      // TODO: handle error lewl
    }

    return res.sendStatus(501)
  }
}