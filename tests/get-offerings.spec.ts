import type { ErrorResponse } from '@tbd54566975/tbdex';
import type { Server } from 'http';

import { RestApi } from '../src/main.js';
import { expect } from 'chai';

let api = new RestApi()
let server: Server;

describe('GET /offerings', () => {
  before(() => {
    server = api.listen(8000)
  })

  after(() => {
    server.close()
    server.closeAllConnections()
  })

  xit('needs tests')
})