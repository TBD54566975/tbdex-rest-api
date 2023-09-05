import type { SubmitCallback, RequestHandler } from '../types.js'

export function submitClose(_callback: SubmitCallback<'close'>): RequestHandler {
  return null
}