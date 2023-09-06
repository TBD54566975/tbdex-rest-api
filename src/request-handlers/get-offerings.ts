import type { GetCallback, OfferingsApi, RequestHandler } from '../types.js'

export function getOfferings(callback: GetCallback<'offerings'>, offeringsApi: OfferingsApi): RequestHandler {
  return async function (req, res) {
    // pass in filter if have
    const offerings = await offeringsApi.getOfferings()

    if (!callback) {
      // TODO: figure out what to do
      return res.sendStatus(200)
    }

    return res.status(200).json(offerings)
  }
}