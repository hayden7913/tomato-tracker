import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import PropTypes from 'prop-types';
import { store } from  '../index.js';

import { Provider } from 'react-redux';

// import { configureStore } from '../store/configureStore';
// const store = configureStore();

// console.log(store.getState());
export default class ModalRoot extends Component {
  componentDidMount() {
    this.modalTarget = document.createElement('div');
    // this.modalTarget.className = 'modal';
    document.body.appendChild(this.modalTarget);
    this._render();
  }
  // componentWillUpdate if using redux
  componentDidUpdate() {
    this._render();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  _render() {
    const { children, className} = this.props;

    ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <div className={` ${className} modal-container`}>
          <div className="modal-background">
            {children}
          </div>
        </div>
      </Provider>
    </AppContainer>,
    this.modalTarget
    );
  }

  render() {
    return <noscript />;
  }
}

// if (module.hot)  {
//   module.hot.accept();
// }

ModalRoot.propTypes = {
  children: PropTypes.object.isRequired,
};
