import type { DefaultRootState } from 'react-redux';
import * as R from 'ramda';

import { LoadState } from '../types';
import selectors from './selectors';
import { Sort } from './types';

const state = {
  breeds: {
    loadState: LoadState.Processed,
    data: [
      { id: '1', name: 'Aaa', lowerName: 'aaa', intelligence: 1, energyLevel: 2 },
      { id: '2', name: 'Bbb', lowerName: 'bbb', intelligence: 1, energyLevel: 2 },
      { id: '3', name: 'Ccc', lowerName: 'ccc', intelligence: 2, energyLevel: 1 },
      { id: '4', name: 'Ddd', lowerName: 'ddd', intelligence: 2, energyLevel: 1 },
    ],
  },
} as DefaultRootState;

describe('Breeds Selectors', () => {
  it('should return data as is with an empty filter', () => {
    const filtered = selectors.filtered(state, {});
    expect(R.equals(state.breeds.data, filtered)).toBeTruthy();
  });

  it('should return filtered data', () => {
    const filtered = selectors.filtered(state, { filters: { q: 'A' } });
    expect(R.equals([state.breeds.data[0]], filtered)).toBeTruthy();
  });

  it('should return most intelligence breeds without filter', () => {
    const filtered = selectors.mostIntelligence(state, {});
    expect(
      R.equals([state.breeds.data[2], state.breeds.data[3]], filtered)
    ).toBeTruthy();
  });

  it('should return most intelligence breeds with filter', () => {
    const filtered = selectors.mostIntelligence(state, { filters: { q: 'C' } });
    expect(R.equals([state.breeds.data[2]], filtered)).toBeTruthy();
  });

  it('should return least intelligence breeds without filter', () => {
    const filtered = selectors.leastIntelligence(state, {});
    expect(
      R.equals([state.breeds.data[0], state.breeds.data[1]], filtered)
    ).toBeTruthy();
  });

  it('should return least intelligence breeds with filter', () => {
    const filtered = selectors.leastIntelligence(state, { filters: { q: 'A' } });
    expect(R.equals([state.breeds.data[0]], filtered)).toBeTruthy();
  });

  it('should correctly sort', () => {
    let sorted = selectors.filteredAndSorted(state, { sort: Sort.NameAsc });
    expect(
      R.equals(
        [
          state.breeds.data[0],
          state.breeds.data[1],
          state.breeds.data[2],
          state.breeds.data[3],
        ],
        sorted
      )
    ).toBeTruthy();

    sorted = selectors.filteredAndSorted(state, { sort: Sort.NameDesc });
    expect(
      R.equals(
        [
          state.breeds.data[3],
          state.breeds.data[2],
          state.breeds.data[1],
          state.breeds.data[0],
        ],
        sorted
      )
    ).toBeTruthy();

    sorted = selectors.filteredAndSorted(state, { sort: Sort.IntelligenceAsc });
    expect(
      R.equals(
        [
          state.breeds.data[0],
          state.breeds.data[1],
          state.breeds.data[2],
          state.breeds.data[3],
        ],
        sorted
      )
    ).toBeTruthy();

    sorted = selectors.filteredAndSorted(state, { sort: Sort.IntelligenceDesc });
    expect(
      R.equals(
        [
          state.breeds.data[2],
          state.breeds.data[3],
          state.breeds.data[0],
          state.breeds.data[1],
        ],
        sorted
      )
    ).toBeTruthy();

    sorted = selectors.filteredAndSorted(state, { sort: Sort.EnergyAsc });
    expect(
      R.equals(
        [
          state.breeds.data[2],
          state.breeds.data[3],
          state.breeds.data[0],
          state.breeds.data[1],
        ],
        sorted
      )
    ).toBeTruthy();

    sorted = selectors.filteredAndSorted(state, { sort: Sort.EnergyDesc });
    expect(
      R.equals(
        [
          state.breeds.data[0],
          state.breeds.data[1],
          state.breeds.data[2],
          state.breeds.data[3],
        ],
        sorted
      )
    ).toBeTruthy();
  });
});
