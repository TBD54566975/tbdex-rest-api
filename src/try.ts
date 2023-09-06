import { Offering } from '@tbd54566975/tbdex';
import type { GetOfferingOpts, OfferingsApi } from './main.js';
import { RestApi } from './main.js';

const offeringsApi: OfferingsApi = {
  getOffering(_opts: GetOfferingOpts): Promise<Offering> {
    throw new Error('Method not implemented.');
  }
}

const api = new RestApi({ offeringsApi })

api.submit('rfq', (ctx, rfq) => {
  console.log(rfq);
})

api.listen(8000)