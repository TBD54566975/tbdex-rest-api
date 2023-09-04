import { api } from './rest-api.js';

api.listen(8000, () => {
  console.log('api listening on port 8000');
})