import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import {Link, Switch, Route} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';

import AddProjectPage from './AddProjectPage';
import EditProjectPage  from './EditProjectPage';
import ProjectsPage from './ProjectsPage';
import TimeTrackerPage from './TimeTrackerPage';

import App2 from '../containers/App2';
// import DevTools from './DevTools';

export default function Root({store, history}) {
  return (
    <Provider store={store}>
      <div>
        <ConnectedRouter history={history}>
          <Route path="/" component={App2} />
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
