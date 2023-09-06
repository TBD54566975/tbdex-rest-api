import type { GetCallback, RequestHandler } from '../types.js'

export function getExchanges(_callback: GetCallback<'exchanges'>): RequestHandler {
  return async function (req, res) {
    return res.sendStatus(501)
  }
}