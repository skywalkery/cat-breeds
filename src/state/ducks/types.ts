export interface QueryFilter {
  q?: string;
}

export interface DataSettings<SortType> {
  limit?: number;
  page?: number;
  sort?: SortType;
}

export enum LoadState {
  Init = 'init',
  Loading = 'loading',
  Processed = 'processed',
}
