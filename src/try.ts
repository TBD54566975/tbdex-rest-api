import { RestApi } from './rest-api.js';

const api = new RestApi()
api.submit('rfq', (ctx, rfq) => {
  console.log(rfq);
})