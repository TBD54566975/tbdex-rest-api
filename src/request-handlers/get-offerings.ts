import type { GetCallback, RequestHandler } from '../types.js'

export function getOfferings(_callback: GetCallback<'offerings'>): RequestHandler {
  return async function (req, res) {
    return res.sendStatus(501)
  }
}