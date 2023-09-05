import type { Request, Response } from 'express'
import type { Message } from '@tbd54566975/tbdex'

export type GetKind = 'exchanges' | 'offerings'
export type GetCallback<T extends GetKind> = (ctx: RequestContext, filter: Filters[T]) => any
export type GetCallbacks = {
  [Kind in GetKind]: GetCallback<Kind>
}

export type SubmitKind = 'rfq' | 'order' | 'close'
export type SubmitCallback<T extends SubmitKind> = (ctx: RequestContext, message: Message<T>) => any
export type SubmitCallbacks = {
  [Kind in SubmitKind]: SubmitCallback<Kind>
}

export type Filters = {
  'offerings': GetOfferingsFilter
  'exchanges': GetExchangesFilter
}

export type GetOfferingsFilter = {
  baseCurrency: string
  quoteCurrency: string
}

export type GetExchangesFilter = {
  ids: string[]
}

export type RequestContext = {
  request: Request
  response: Response
}

export type RequestHandler = (request: Request, response: Response) => any