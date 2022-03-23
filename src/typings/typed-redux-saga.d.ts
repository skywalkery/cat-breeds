/* eslint-disable import/prefer-default-export */
import type { DefaultRootState } from 'react-redux';

declare module 'typed-redux-saga' {
  export function select<TState = DefaultRootState, TSelected = unknown>(
    selector: (state: TState) => TSelected
  ): SagaGenerator<TSelected, SelectEffect>;
}
