import axios from '@axios';
import type { ApiBreedRequest, ApiBreedResponse } from './types';
import { DEFAULT_LIMIT } from './constants';

const api = {
  async fetch({ page = 0, limit = DEFAULT_LIMIT }: ApiBreedRequest) {
    return (
      await axios.get<ApiBreedResponse>(`/breeds`, {
        params: {
          page,
          limit,
        },
      })
    ).data;
  },
};

export default api;
