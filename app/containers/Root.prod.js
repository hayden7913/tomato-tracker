import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import Router from '../routes';

export default class Root extends Component {
  render() {
    const { history, store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <ConnectedRouter history={history}>
            <div>
              { Router }
            </div>
          </ConnectedRouter>
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
