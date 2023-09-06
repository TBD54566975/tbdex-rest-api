import type { ExchangesApi, GetCallback, RequestHandler } from '../types.js'

type GetExchangesOpts = {
  callback: GetCallback<'exchanges'>
  exchangesApi: ExchangesApi
}

export function getExchanges(opts: GetExchangesOpts): RequestHandler {
  const { callback, exchangesApi } = opts
  return async function (req, res) {
    // verify token

    // check exchanges exist - what to do if some exist but others don't?
    const ids = req.query.ids as string[]

    // check requester did == exchange did

    // get exchanges

    // call callback

    //
    const exchanges = await exchangesApi.getExchanges({ ids })

    return res.json(exchanges).status(200).send()
  }
}