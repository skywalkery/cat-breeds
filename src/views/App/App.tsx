import { Suspense } from 'react';
import { Route, Switch } from 'react-router';

import Header from '@views/Header';
import Footer from '@views/Footer';
import PageLoader from '@views/PageLoader';
import { BreedSearchAsync } from './asyncLoaders';
import './styles.scss';

const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route component={BreedSearchAsync} />
        </Switch>
      </Suspense>
      <Footer />
    </>
  );
};

export default App;
