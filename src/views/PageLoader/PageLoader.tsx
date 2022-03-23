import { memo } from 'react';

import LoaderAnimation from '@views/LoaderAnimation';
import styles from './styles.scss';

const PageLoader = () => {
  return (
    <div className={styles.container}>
      <LoaderAnimation className={styles.loader} />
    </div>
  );
};

export default memo(PageLoader);
