import type { GetCallback, RequestHandler } from '../types.js'

export function getExchanges(_callback: GetCallback<'exchanges'>, exchangeApi: ExchangeApi): RequestHandler {
  return async function (req, res) {
    // verify token

    // check exchanges exist - what to do if some exist but others don't?
    const ids = req.query.ids as string[]

    // check requester did == exchange did

    // get exchanges

    // call callback

    //
    const exchanges = await exchangeApi.getExchanges(ids)

    return res.json(exchanges).status(200).send()
  }
}