import { FC, useCallback } from 'react';

import styles from './styles.scss';

type Props = {
  type?: HTMLInputElement['type'];
  value?: HTMLInputElement['value'];
  onChange?: (val: string) => void;
  autoComplete?: HTMLInputElement['autocomplete'];
  placeholder?: HTMLInputElement['placeholder'];
  className?: string;
  isDisabled?: boolean;
};

const Input: FC<Props> = ({
  type = 'text',
  value,
  onChange: onChangeOrigin,
  autoComplete = 'off',
  placeholder,
  className = '',
  isDisabled = false,
}) => {
  const onChange = useCallback((e) => onChangeOrigin?.(e.target.value), [
    onChangeOrigin,
  ]);

  return (
    <input
      className={`${styles.container} ${className}`}
      type={type}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      placeholder={placeholder}
      disabled={isDisabled}
    />
  );
};

export default Input;
