# tbDEX RESTful API

> [!WARNING]
>
> This repo is currently under construction 🚧


# Usage
```typescript
import { TbdexRestApi } from '@tbdex/rest-api'

const api = new TbdexRestApi()

api.get('offerings', async (ctx, filter) => { /* write biz logic here */ })
api.get('exchanges', async (ctx, filter) => { /* write biz logic here */ })

api.submit('rfq', async (ctx, message) => { /* write biz logic here */ })
api.submit('order', async (ctx, message) => { /* write biz logic here */ })
api.submit('close', async (ctx, message) => { /* write biz logic here */ })


await api.listen()
```