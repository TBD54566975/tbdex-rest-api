import type { SubmitCallback, RequestHandler, OfferingsApi, QuoteApi, RfqApi } from '../types.js'
import type { ErrorDetail, MessageKind } from '@tbd54566975/tbdex'

import { Message } from '@tbd54566975/tbdex'

export function submitRfq(callback: SubmitCallback<'rfq'>, offeringsApi: OfferingsApi, quoteApi: QuoteApi, rfqApi: RfqApi): RequestHandler {
  return async function (req, res) {
    let message: Message<MessageKind>

    try {
      message = await Message.parse(req.body)
    } catch(e) {
      const errorResponse: ErrorDetail = { detail: e.message }
      return res.status(400).json({ errors: [errorResponse] })
    }

    if (!message.isRfq()) {
      const errorResponse: ErrorDetail = { detail: 'expected request body to be a valid rfq' }
      return res.status(400).json({ errors: [errorResponse] })
    }

    // TODO: check message.from against allowlist
    // TODO: check if the exchangeId already exists.

    // TODO: fetch offering based on rfq.offeringId
    const offering = await offeringsApi.getOffering({ id: message.data.offeringId })
    if (!offering) {
      return res.status(400).json({ errors: [`offering ${message.data.offeringId} does not exist`] })
    }

    // TODO: validate rfq based on offering using rfq.verifyOfferingRequirements(offering)
    message.verifyOfferingRequirements(offering)

    // save rfq to db - should we leave them to do this in the callback?
    await rfqApi.createRfq(message)

    // generate a quote and save it
    await quoteApi.createQuote({
      offering,
      rfq: message
    })

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