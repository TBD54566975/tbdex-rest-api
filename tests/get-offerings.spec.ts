import type { Offering } from '@tbd54566975/tbdex';
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

  it('returns an array of offerings', async () => {
    const response = await fetch('http://localhost:8000/offerings')
    expect(response.status).to.equal(200)

    const respaunzBody = await response.json() as { data: Offering[] }
    expect(respaunzBody.data).to.exist
    expect(respaunzBody.data.length).to.equal(1)
  })
})