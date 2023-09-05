import { RestApi } from './rest-api.js';

const api = new RestApi()

api.submit('rfq', async (_rfq) => {})

api.get('offerings', (ctx, filter) => {})