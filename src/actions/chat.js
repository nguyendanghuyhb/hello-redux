import {asyncSetPlayer} from './game';

export const handleMessage = (playerName, event) => ({
    type: 'HANDLE_MESSAGE',
    playerName: playerName,
    message: event.target.value
});

export const chat = () => ({
    type: 'CHAT',
    message: ''
});

/***************************************************************************************** */
/* Async Action items using - Sockets													      */
/***************************************************************************************** */
export const asyncChat = (socket, message, event) => {
    event.preventDefault();
    if (!message) {
        return asyncSetPlayer(socket);
    }
    return (dispatch) => {
        socket.emit('chat', {message});
        dispatch(chat());
    }
};

export const asyncHandleMessage = (playerName, event) => {
    return (dispatch) => {
        dispatch(handleMessage(playerName, event));
    }
};

export const asyncHandleKeyPress = (socket, message, event) => {
    return (dispatch) => {
        if (event.key === "Enter") {
            dispatch(asyncChat(socket, message, event));
        }
    }
};