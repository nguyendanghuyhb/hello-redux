export const handleClick = (i, j) => ({
    type: 'HANDLE_CLICK',
    x: i,
    y: j
});

export const refreshBoard = (boardInfo) => ({
    type: 'REFRESH_BOARD',
    boardInfo: boardInfo,
    data: boardInfo.data,
    player1: boardInfo.player1,
    player2: boardInfo.player2,
    stepX: boardInfo.stepX,
    stepY: boardInfo.stepY,
    isPlay: false
});

export const setPlayer = (type) => ({
    type: 'SET_PLAYER',
    playerType: type
});

/***************************************************************************************** */
/* Async Action items using - Sockets													      */
/***************************************************************************************** */
export const asyncRefreshBoard = (socket) => {
    return (dispatch) => {
        socket.emit('getBoardInfo', null, (boardInfo) => {
            console.log(boardInfo);
            dispatch(refreshBoard(boardInfo));
        })
    }
};

export const asyncSetPlayer = (socket, type) => {
    return (dispatch) => {
        dispatch(setPlayer(type));
        socket.emit('setPlayer', {type})
    }
};

export const asyncHandleClick = (socket, i, j, version) => {
    return (dispatch) => {
        dispatch(handleClick(i, j));
        socket.emit('touch', {x: i, y: j, version: version});
    }
};

export const asyncChangeUsername = (socket, event) => {
    let username = event.target.textContent;
    username = username.replace(/[✔]/g, '').trim();
    return () => {
        socket.emit('changeUsername', {playerName: username})
    }
};

export const asyncNewGame = (socket) => {
    return () => {
        socket.emit('newGame');
    }
};