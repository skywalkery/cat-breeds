import { createStore, applyMiddleware, PreloadedState } from 'redux';
import createSagaMiddleware, { Saga } from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './ducks/root-reducer';

export default function configureStore<S>(
  initialState?: PreloadedState<S>,
  rootSaga?: Saga
) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools({ trace: true, traceLimit: 25 })(
      applyMiddleware(sagaMiddleware)
    )
  );

  if (rootSaga) {
    sagaMiddleware.run(rootSaga);
  }

  return store;
}
