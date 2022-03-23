import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import App from '@views/App';
import history from '@history';
import configureStore from './state/store';
import rootSaga from './state/sagas';

const reduxStore = configureStore(undefined, rootSaga);

ReactDOM.render(
  <Provider store={reduxStore}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
