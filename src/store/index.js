import {  combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import postReducer from './reducers/postReducer';
import { legacy_createStore as createStore} from 'redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  posts: postReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

