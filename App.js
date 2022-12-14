import React from 'react';
import { Provider } from 'react-redux';
import { RootNavigator } from './src/navigation/';
import store from './src/store/store';

const App = () => (
  <Provider store={store}>
    <RootNavigator />
  </Provider>
);

export default App;
