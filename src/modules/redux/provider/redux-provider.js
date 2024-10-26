// @flow

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../store';

class AppStoreProvider extends PureComponent {
  getChildContext() {
    return {
      store,
    };
  }

  static childContextTypes = {
    store: PropTypes.shape({}),
  };

  render() {
    const { children } = this.props;
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    );
  }
}

export default AppStoreProvider;
