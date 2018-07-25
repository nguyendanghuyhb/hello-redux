import {combineReducers} from 'redux';
import game from './game';
import chat from './chat';

export default combineReducers({
    game,
    chat
})
