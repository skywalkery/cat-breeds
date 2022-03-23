import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useUrlFilters from '@hooks/useUrlFilters';
import useUrlDataSettings from '@hooks/useUrlDataSettings';
import { breedsActions, breedsSelectors } from '@ducks/breeds';
import { BreedFilters, Sort } from '@ducks/breeds/types';
import { LoadState } from '@ducks/types';
import LoaderAnimation from '@views/LoaderAnimation';
import Filters from './Filters';
import BreedSnippet from './BreedSnippet';
import Statistics from './Statistics';
import { DATA_URL_PREFIX, DEFAULT_SORT } from './constants';
import styles from './styles.scss';
import BreedSort from './BreedSort';

const queryTransformer = (obj: any) => {
  const typed = { ...obj };
  if (typed.page) typed.page = Number(typed.page);
  return typed as BreedFilters;
};

const BreedSearch = () => {
  const dispatch = useDispatch();

  const { dataSettings, setDataSettings } = useUrlDataSettings<Sort>(
    DATA_URL_PREFIX
  );
  const { filters, setFilters } = useUrlFilters<BreedFilters>(
    DATA_URL_PREFIX,
    queryTransformer
  );

  const onFiltersChange = useCallback(
    ({ name }) => {
      setFilters({ ...filters, q: name });
    },
    [filters, setFilters]
  );
  const onSortChange = useCallback(
    (sort) => {
      setDataSettings({ ...dataSettings, sort });
    },
    [dataSettings, setDataSettings]
  );

  const loadState = useSelector((state) => state.breeds.loadState);
  const isLoading =
    loadState === LoadState.Loading || loadState === LoadState.Init;

  const breeds = useSelector((state) =>
    breedsSelectors.filteredAndSorted(state, {
      filters,
      sort: dataSettings.sort || DEFAULT_SORT,
    })
  );
  const hasResults = !!breeds.length;

  useEffect(() => {
    dispatch(
      breedsActions.fetch.request({
        limit: dataSettings.limit,
        page: dataSettings.page,
      })
    );
  }, [dispatch, dataSettings.limit, dataSettings.page]);

  return (
    <main className={styles.container}>
      {isLoading ? (
        <LoaderAnimation className={styles.loader} />
      ) : (
        <div className={styles.inner}>
          <h1>Find Your Perfect Cat Breed</h1>
          <Filters
            initialName={filters.q}
            onChange={onFiltersChange}
            isDisabled={isLoading}
          />
          {hasResults && (
            <div className={styles.statSort}>
              <Statistics filters={filters} />
              <BreedSort
                value={dataSettings.sort}
                onChange={onSortChange}
                isDisabled={isLoading}
              />
            </div>
          )}
          {!hasResults ? (
            <h3 className={styles.noResults}>No Results</h3>
          ) : (
            <div className={styles.snippets}>
              {breeds.map((breed) => (
                <BreedSnippet key={breed.id} breed={breed} />
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default BreedSearch;
