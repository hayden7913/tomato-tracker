import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import {Route} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import TimeTrackerPage from './TimeTrackerPage';

import App from '../containers/App';
// import DevTools from './DevTools';

export default function Root({store, history}) {
  return (
    <Provider store={store}>
      <div>
        <ConnectedRouter history={history}>
          <Route path="/" component={TimeTrackerPage}/>
          {/* <Route exact path="/" component={TimeTrackerPage}/> */}
        </ConnectedRouter>
        {/* <DevTools /> */}
      </div>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
