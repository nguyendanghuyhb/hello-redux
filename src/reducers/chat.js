const initiateState = {
    playerName: '',
    message: ''
};

const chat = (state = initiateState, action) => {
    switch (action.type) {
        case 'HANDLE_MESSAGE':
            return {
                ...state,
                playerName: action.playerName,
                message: action.message
            };
        case 'CHAT':
            return {
                ...state,
                message: action.message
            };
        default:
            return state;
    }
};

export default chat