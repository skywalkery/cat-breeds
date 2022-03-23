import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { breedsSelectors } from '@ducks/breeds';
import type { Breed, BreedFilters } from '@ducks/breeds/types';
import styles from './styles.scss';

type IntelligenceStatProps = {
  breeds: Breed[];
  type: 'Most' | 'Least';
};

const IntelligenceStat: FC<IntelligenceStatProps> = ({ breeds, type }) => {
  const names = useMemo(() => breeds.map((breed) => breed.name).join(', '), [
    breeds,
  ]);

  return (
    <div>
      {type} Intelligent cat breed{breeds.length > 1 ? 's' : ''}: {names}, with
      intelligence of {breeds[0]?.intelligence}
    </div>
  );
};

type Props = {
  filters: BreedFilters;
};

const Statistics: FC<Props> = ({ filters }) => {
  const mostIntelligence = useSelector((state) =>
    breedsSelectors.mostIntelligence(state, { filters })
  );
  const leastIntelligence = useSelector((state) =>
    breedsSelectors.leastIntelligence(state, { filters })
  );

  const isShown = !!mostIntelligence.length;

  return (
    <div className={styles[`container${isShown ? '' : '-hidden'}`]}>
      <IntelligenceStat type="Most" breeds={mostIntelligence} />
      <IntelligenceStat type="Least" breeds={leastIntelligence} />
    </div>
  );
};

export default Statistics;
