import type { ExchangesApi, GetCallback, GetExchangesFilter, RequestHandler } from '../types.js'

type GetExchangesOpts = {
  callback: GetCallback<'exchanges'>
  exchangesApi: ExchangesApi
}

export function getExchanges(opts: GetExchangesOpts): RequestHandler {
  const { callback, exchangesApi } = opts
  return async function (request, response) {
    // TODO: verify authz token (#issue 9)

    const queryParams = request.query as GetExchangesFilter

    // check exchanges exist - what to do if some exist but others don't?
    const exchanges = await exchangesApi.getExchanges(queryParams)

    if (callback) {
      // TODO: figure out what to do with callback result. should we pass through the exchanges we've fetched
      //       and allow the callback to modify what's returned? (issue #10)
      const result = await callback({ request, response }, queryParams)
    }

    return response.status(200).json({ data: exchanges })
  }
}