import { takeLatest, call, put } from 'typed-redux-saga/macro';
import { getType } from 'typesafe-actions';

import { fetch } from './actions';
import api from './api';

export function* onFetch({ payload }: ReturnType<typeof fetch.request>) {
  try {
    const res = yield* call(api.fetch, payload);
    yield put(
      fetch.success(
        res.map((apiBreed) => ({
          id: apiBreed.id,
          energyLevel: apiBreed.energy_level,
          intelligence: apiBreed.intelligence,
          name: apiBreed.name,
          lowerName: apiBreed.name.toLowerCase(),
          description: apiBreed.description,
          imageUrl: apiBreed.image?.url,
        }))
      )
    );
  } catch (e) {
    yield put(fetch.failure());
  }
}

export default function* root() {
  yield takeLatest(getType(fetch.request), onFetch);
}
