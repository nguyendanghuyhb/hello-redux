import { createActionLog } from 'redux-action-log';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const actionLog = createActionLog({ limit: 100 });

let enhancer = applyMiddleware(thunk);
enhancer = compose(
  enhancer,
  actionLog.enhancer
);

const store = createStore(rootReducer, enhancer);

export default store;
