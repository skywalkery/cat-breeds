export type RootState = ReturnType<typeof import('@ducks/root-reducer').default>;

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}
