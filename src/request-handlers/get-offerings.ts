import type { GetCallback, GetOfferingsFilter, OfferingsApi, RequestHandler } from '../types.js'

type GetOfferingsOpts = {
  callback: GetCallback<'offerings'>
  offeringsApi: OfferingsApi
}

export function getOfferings(opts: GetOfferingsOpts): RequestHandler {
  const { callback, offeringsApi } = opts

  return async function (request, response) {
    const queryParams = request.query as GetOfferingsFilter
    const offerings = await offeringsApi.getOfferings({ filter: queryParams })

    if (callback) {
      await callback({ request, response }, {} as any)
    }

    return response.status(200).json(offerings)
  }
}