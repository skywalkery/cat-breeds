import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';
import qs, { ParsedQs } from 'qs';

import useUrlQuery from './useUrlQuery';

export default <T>(prefix: string, objTransformer: (obj: ParsedQs) => T) => {
  const history = useHistory();

  const query = useUrlQuery();

  const indexKey = `${prefix}-filters`;

  const filters = useMemo(() => {
    const parsedObj =
      (query as {
        [k: string]: any;
      })[indexKey] || {};

    return objTransformer(parsedObj);
  }, [query, objTransformer, indexKey]);

  const setFilters = useCallback(
    (newFilters: T) => {
      history.replace({
        search: qs.stringify(
          {
            ...query,
            [indexKey]: newFilters,
          },
          { allowDots: true }
        ),
      });
    },
    [history, query, indexKey]
  );

  return { filters, setFilters };
};
