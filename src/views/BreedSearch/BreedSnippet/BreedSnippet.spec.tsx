/* eslint-disable import/no-extraneous-dependencies */
import renderer from 'react-test-renderer';

import type { Breed } from '@ducks/breeds/types';
import BreedSnippet from './BreedSnippet';

const breed: Breed = {
  energyLevel: 5,
  id: '1',
  intelligence: 4,
  lowerName: 'aaa',
  name: 'Aaa',
  description: 'Lorem iprum dolorem',
  imageUrl: '/img.jpg',
};

describe('Breed Snippet', () => {
  it('renders properly', () => {
    const component = renderer.create(<BreedSnippet breed={breed} />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
