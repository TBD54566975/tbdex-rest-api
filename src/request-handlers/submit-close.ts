import type { ErrorDetail, MessageKind } from '@tbd54566975/tbdex'
import type { SubmitCallback, RequestHandler, ExchangesApi } from '../types.js'

import { Message } from '@tbd54566975/tbdex'

type SubmitCloseOpts = {
  callback: SubmitCallback<'close'>
  exchangesApi: ExchangesApi
}

export function submitClose(opts: SubmitCloseOpts): RequestHandler {
  const { callback, exchangesApi } = opts

  return async function (req, res) {
    let message: Message<MessageKind>

    try {
      message = await Message.parse(req.body)
    } catch(e) {
      const errorResponse: ErrorDetail = { detail: e.message }
      return res.status(400).json({ errors: [errorResponse] })
    }

    if (!message.isClose()) {
      const errorResponse: ErrorDetail = { detail: 'expected request body to be a valid close' }
      return res.status(400).json({ errors: [errorResponse] })
    }

    // TODO: get most recent message added to exchange. use that to see if close is allowed
    // could be an RFQ or a Quote which is being closed, need to query both
    // do we allow closes after Order has been submitted?

    // TODO: return 404 if exchange not found
    // TODO: return 409 if close is not allowed given the current state of the exchange

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