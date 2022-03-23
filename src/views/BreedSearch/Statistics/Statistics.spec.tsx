/* eslint-disable import/no-extraneous-dependencies */
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { LoadState } from '@ducks/types';
import Statistics from './Statistics';

const breeds = {
  loadState: LoadState.Processed,
  data: [
    { id: '1', name: 'Aaa', lowerName: 'aaa', intelligence: 1, energyLevel: 2 },
    { id: '2', name: 'Bbb', lowerName: 'bbb', intelligence: 1, energyLevel: 2 },
    { id: '3', name: 'Ccc', lowerName: 'ccc', intelligence: 2, energyLevel: 1 },
    { id: '4', name: 'Ddd', lowerName: 'ddd', intelligence: 2, energyLevel: 1 },
  ],
};

describe('Breed Statistics', () => {
  it('renders properly without filter', () => {
    const store = createStore(() => ({
      breeds,
    }));

    const component = renderer.create(
      <Provider store={store}>
        <Statistics filters={{}} />
      </Provider>
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders properly with filter', () => {
    const store = createStore(() => ({
      breeds,
    }));

    const component = renderer.create(
      <Provider store={store}>
        <Statistics filters={{ q: 'A' }} />
      </Provider>
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
