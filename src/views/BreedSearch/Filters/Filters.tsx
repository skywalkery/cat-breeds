import { FC, useEffect, useState } from 'react';

import Input from '@views/Input';
import { NAME_DEBOUNCE_MS } from './constants';
import styles from './styles.scss';

type Props = {
  onChange?: ({ name }: { name: string }) => void;
  initialName?: string;
  isDisabled?: boolean;
};

const Filters: FC<Props> = ({
  onChange,
  initialName = '',
  isDisabled = false,
}) => {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (name !== initialName) {
      timer = setTimeout(() => onChange?.({ name }), NAME_DEBOUNCE_MS);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [name, onChange, initialName]);

  return (
    <div className={styles.container}>
      <Input
        className={styles.nameInput}
        placeholder="Name"
        value={name}
        onChange={setName}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default Filters;
