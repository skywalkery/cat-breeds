import { ActionType, StateType } from 'typesafe-actions';

export type RootAction = ActionType<typeof import('@ducks/root-action').default>;

declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction;
  }
}
