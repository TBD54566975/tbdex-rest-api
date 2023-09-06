import { RestApi } from './main.js';

const api = new RestApi()

api.submit('rfq', (ctx, rfq) => {
  console.log(rfq);
})

api.listen(8000)