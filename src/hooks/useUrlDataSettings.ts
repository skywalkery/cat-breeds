import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';
import qs from 'qs';
import * as R from 'ramda';

import type { DataSettings } from '@ducks/types';
import useUrlQuery from './useUrlQuery';

export default <SortType>(prefix: string) => {
  const history = useHistory();

  const query = useUrlQuery();

  const indexKey = `${prefix}-settings`;

  const dataSettings = useMemo(() => {
    const parsedObj =
      (query as {
        [k: string]: any;
      })[indexKey] || {};

    if (parsedObj.limit) parsedObj.limit = Number.parseInt(parsedObj.limit, 10);

    return R.pick(['limit', 'sort'], parsedObj) as DataSettings<SortType>;
  }, [indexKey, query]);

  const setDataSettings = useCallback(
    (newSettings: DataSettings<SortType>) => {
      history.replace({
        search: qs.stringify(
          {
            ...query,
            [indexKey]: newSettings,
          },
          { allowDots: true }
        ),
      });
    },
    [history, query, indexKey]
  );

  return { dataSettings, setDataSettings };
};
