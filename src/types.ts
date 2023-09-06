import type { Request, Response } from 'express'
import type { Close, Message, MessageKind, Offering, Order, Quote, Rfq } from '@tbd54566975/tbdex'

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

export type GetOfferingOpts = {
  id: string
}

export type GetOfferingsOpts = {
  filter?: GetOfferingsFilter
}

export interface OfferingsApi {
  getOffering(opts: GetOfferingOpts): Promise<Offering | undefined>
  getOfferings(opts?: GetOfferingsOpts): Promise<Offering[] | undefined>
}

export type GetExchangesOpts = {
  ids: string[]
}

export interface ExchangeApi {
  getExchanges(opts: GetExchangesOpts): Promise<Message<MessageKind>[] | undefined>
}

export type CreateQuoteOpts = {
  offering: Offering,
  rfq: Rfq
}
export interface QuoteApi {
  getQuote(exchangeId: string): Promise<Quote>
  createQuote(opts: CreateQuoteOpts): Promise<Quote | undefined>
}

// export type CreateOrderOpts = {
//   exchangeId: string
// }
export interface OrderApi {
  createOrder(quoteId: string): Promise<unknown>
  getOrder(exchangeId: string): Promise<Order>
}

export interface CloseApi {
  getClose(exchangeId: string): Promise<Close>
  createClose(exchangeId: string)
}

export interface RfqApi {
  createRfq(rfq: Rfq): Promise<void>
}