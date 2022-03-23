import type { DefaultRootState } from 'react-redux';
import { createSelector } from 'reselect';

import { Breed, BreedFilters, Sort } from './types';

export const filtered = createSelector(
  (state: DefaultRootState) => state.breeds.data,
  (_: DefaultRootState, { filters }: { filters?: BreedFilters }) =>
    filters?.q?.toLowerCase() || '',
  (breeds, q) => {
    return breeds.filter((breed) => breed.lowerName.includes(q));
  }
);

const nameComparator = (sort: Sort, a: Breed, b: Breed) =>
  (sort === Sort.NameAsc ? 1 : -1) * a.name.localeCompare(b.name);

export const filteredAndSorted = createSelector(
  filtered,
  (_: DefaultRootState, { sort }: { sort?: Sort }) => sort,
  (breeds, sort) => {
    switch (sort) {
      case Sort.NameAsc:
      case Sort.NameDesc: {
        return [...breeds].sort((a, b) => nameComparator(sort, a, b));
      }
      case Sort.IntelligenceAsc:
      case Sort.IntelligenceDesc: {
        return [...breeds].sort((a, b) =>
          a.intelligence === b.intelligence
            ? nameComparator(Sort.NameAsc, a, b)
            : (sort === Sort.IntelligenceAsc ? 1 : -1) *
              (a.intelligence > b.intelligence ? 1 : -1)
        );
      }
      case Sort.EnergyAsc:
      case Sort.EnergyDesc: {
        return [...breeds].sort((a, b) =>
          a.energyLevel === b.energyLevel
            ? nameComparator(Sort.NameAsc, a, b)
            : (sort === Sort.EnergyAsc ? 1 : -1) *
              (a.energyLevel > b.energyLevel ? 1 : -1)
        );
      }
      default:
        throw new Error(`Unknown sort: ${sort}`);
    }
  }
);

const findIntelligenceExtremumValues = (
  values: Breed[],
  comparator: (l: number, r: number) => boolean
) => {
  let res = [] as Breed[];
  if (values.length) {
    res.push(values[0]);
  }
  for (let i = 1; i < values.length; i++) {
    if (comparator(values[i].intelligence, res[0].intelligence)) {
      res = [values[i]];
    } else if (values[i].intelligence === res[0].intelligence) {
      res.push(values[i]);
    }
  }
  res.sort((b1, b2) => b1.name.localeCompare(b2.name));
  return res;
};

export const mostIntelligence = createSelector(filtered, (breeds) =>
  findIntelligenceExtremumValues(breeds, (l, r) => l > r)
);

export const leastIntelligence = createSelector(filtered, (breeds) =>
  findIntelligenceExtremumValues(breeds, (l, r) => l < r)
);

export default {
  mostIntelligence,
  leastIntelligence,
  filtered,
  filteredAndSorted,
};
