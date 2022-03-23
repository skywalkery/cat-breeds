import { useMemo } from 'react';
import { useLocation } from 'react-router';
import qs from 'qs';

export default () => {
  const location = useLocation();

  const query = useMemo(
    () => qs.parse(location.search, { ignoreQueryPrefix: true, allowDots: true }),
    [location.search]
  );

  return query;
};
