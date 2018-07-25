import React from 'react';
import {createActionLog} from 'redux-action-log';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose, createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import Game from '../components/Game';

const actionLog = createActionLog({limit: 100});

let enhancer = applyMiddleware(thunk);
enhancer = compose(enhancer, actionLog.enhancer);

const store = createStore(rootReducer, enhancer);

// console.log(actionLog.getLog());

render(
    <Provider store={store}>
        <Game/>
    </Provider>,
    document.getElementById('root')
);
