import { all } from 'redux-saga/effects';

import breeds from '@ducks/breeds/sagas';

export default function* rootSaga() {
  yield all([breeds()]);
}
