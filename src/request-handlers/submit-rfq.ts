import type { SubmitCallback, RequestHandler } from '../types.js'
import type { ErrorDetail, MessageKind } from '@tbd54566975/tbdex'

import { Message } from '@tbd54566975/tbdex'

export function submitRfq(callback: SubmitCallback<'rfq'>): RequestHandler {
  return async function (req, res) {
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

    // TODO: handle result and return appropriate response

    // TODO: we need to check if the exchangeId already exists.
    // TODO: fetch offering based on rfq.offeringId
    // TODO: validate rfq based on offering using rfq.verifyOfferingRequirements(offering)

    return res.sendStatus(501)
  }
}