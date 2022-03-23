import { createAsyncAction } from 'typesafe-actions';

import types, { ApiBreedRequest, Breed } from './types';

export const fetch = createAsyncAction(
  types.BREEDS_FETCH,
  types.BREEDS_FETCH_SUCCESS,
  types.BREEDS_FETCH_ERROR
)<ApiBreedRequest, Breed[], void>();

export default {
  fetch,
};
