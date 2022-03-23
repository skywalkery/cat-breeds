import type { FC } from 'react';
import Rating from 'react-rating';

import styles from './styles.scss';

type Props = {
  value: number;
};

const BreedRating: FC<Props> = ({ value }) => {
  return (
    <Rating
      readonly
      initialRating={value}
      emptySymbol={
        <img
          src="/static/icons/paw-empty.png"
          alt="Empty icon"
          className={styles.icon}
        />
      }
      fullSymbol={
        <img
          src="/static/icons/paw-fill.png"
          alt="Fill icon"
          className={styles.icon}
        />
      }
    />
  );
};

export default BreedRating;
