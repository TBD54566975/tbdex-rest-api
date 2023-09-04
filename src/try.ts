import { PfiRestClient, DevTools } from '@tbd54566975/tbdex';

const alice = await DevTools.createDid('ion')
const rfq = await DevTools.createRfq({ sender: alice })

const { privateKeyJwk } = alice.keySet.verificationMethodKeys[0]
await rfq.sign(privateKeyJwk, privateKeyJwk.kid)

console.log(JSON.stringify(rfq, null, 2));

const resp = await PfiRestClient.sendMessage({ message: rfq })
console.log(JSON.stringify(resp, null, 2));