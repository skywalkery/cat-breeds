import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { LoadState } from '@ducks/types';
import type { Breed } from './types';
import { fetch } from './actions';

const INITIAL_STATE = {
  loadState: LoadState.Init,
  data: [] as Breed[],
};

export const loadStateReducer = createReducer(INITIAL_STATE.loadState)
  .handleAction([fetch.request], () => LoadState.Loading)
  .handleAction([fetch.success, fetch.failure], () => LoadState.Processed);

export const dataReducer = createReducer(INITIAL_STATE.data).handleAction(
  [fetch.success],
  (_, { payload: data }) => data
);

const reducer = combineReducers({
  loadState: loadStateReducer,
  data: dataReducer,
});

export default reducer;
