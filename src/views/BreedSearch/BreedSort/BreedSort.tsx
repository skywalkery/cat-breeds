import { FC, useCallback, useMemo } from 'react';
import Select from 'react-select';

import { Sort } from '@ducks/breeds/types';
import { SORT_OPTIONS } from './constants';
import styles from './styles.scss';

type Props = {
  isDisabled?: boolean;
  onChange?: (newVal: Sort) => void;
  value?: typeof SORT_OPTIONS[0]['value'];
};

const BreedSort: FC<Props> = ({
  isDisabled,
  onChange: onChangeOrigin,
  value = SORT_OPTIONS[0].value,
}) => {
  const onChange = useCallback(
    (option) => {
      onChangeOrigin?.(Sort[option.value as keyof typeof Sort] || Sort.NameAsc);
    },
    [onChangeOrigin]
  );

  const option = useMemo(
    () => SORT_OPTIONS.find((o) => o.value === value) || SORT_OPTIONS[0],
    [value]
  );

  return (
    <Select
      className={styles.optionsSelect}
      isDisabled={isDisabled}
      options={SORT_OPTIONS}
      onChange={onChange}
      value={option}
    />
  );
};

export default BreedSort;
