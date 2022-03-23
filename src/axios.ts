import axios from 'axios';

import { BASE_URL, AUTH_KEY } from '@env';

const defaultInstance = axios.create({
  baseURL: BASE_URL,
});

defaultInstance.defaults.headers.common['x-api-key'] = AUTH_KEY;

export default defaultInstance;
