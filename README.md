# tbDEX RESTful API

> [!WARNING]
>
> This repo is currently under construction 🚧

# Installation
```bash
npm install @tbd54566975/tbdex-rest-api
```
# Usage
```typescript
import { RestApi } from '@tbd54566975/tbdex-rest-api'

const api = new RestApi()

api.get('offerings', async (ctx, filter) => { /* write biz logic here */ })
api.get('exchanges', async (ctx, filter) => { /* write biz logic here */ })

api.submit('rfq', async (ctx, message) => { /* write biz logic here */ })
api.submit('order', async (ctx, message) => { /* write biz logic here */ })
api.submit('close', async (ctx, message) => { /* write biz logic here */ })


await api.listen()
```