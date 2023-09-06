import type { Request, Response } from 'express'
import type { Close, Message, MessageKindClass, Offering, Order, OrderStatus, Quote, Rfq } from '@tbd54566975/tbdex'

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

export interface OfferingsApi {
  getOffering(opts: { id: string }): Promise<Offering | undefined>
  getOfferings(opts?: { filter: GetOfferingsFilter }): Promise<Offering[] | undefined>
}

export interface ExchangesApi {
  getExchanges(opts: { ids: string[] }): Promise<MessageKindClass[][] | undefined>
  getExchange(opts: { id: string }): Promise<MessageKindClass[] | undefined>
  getRfq(opts: { exchangeId: string }): Promise<Rfq | undefined>
  getQuote(opts: { exchangeId: string }): Promise<Quote | undefined>
  getOrder(opts: { exchangeId: string }): Promise<Order | undefined>
  getOrderStatuses(opts: { exchangeId: string }): Promise<OrderStatus[] | undefined>
  getClose(opts: { exchangeId: string }): Promise<Close | undefined>
}