import { OfferingsApi } from './main.js'

export const fakeOfferingsApi: OfferingsApi = {
  getOffering() { return undefined },
  getOfferings() { throw new Error('Function not implemented.') }
}