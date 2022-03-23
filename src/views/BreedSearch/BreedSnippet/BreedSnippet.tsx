import { FC, memo } from 'react';

import type { Breed } from '@ducks/breeds/types';
import { DEFAULT_IMG_URL } from './constants';
import styles from './styles.scss';
import BreedRating from './BreedRating';

type Props = {
  breed: Breed;
};

const BreedSnippet: FC<Props> = ({
  breed: { energyLevel, intelligence, name, description, imageUrl },
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.imgWrapper}>
        <img src={imageUrl || DEFAULT_IMG_URL} alt="Cat img" />
        <div className={styles.titles}>
          <span className={styles.name}>{name}</span>
          <div>
            <span>Energy Level: </span>
            <BreedRating value={energyLevel} />
          </div>
          <div>
            <span>Intelligence: </span>
            <BreedRating value={intelligence} />
          </div>
        </div>
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export default memo(BreedSnippet);
