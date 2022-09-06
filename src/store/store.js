import { applyMiddleware, createStore, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/authReducer';
import tabReducer from './reducers/tabReducer';
import userReducer from './reducers/userReducer';

let middlewares = [ReduxThunk];

const rootReducer = combineReducers({
  auth: authReducer,
  tab: tabReducer,
  user: userReducer,
});

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export default store;
