import { createData } from '../constants';

const initiateState = {
  version: 1,
  boardInfo: [],
  data: createData(),
  player1: '',
  player2: '',
  isSetPlayer1: false,
  isSetPlayer2: false,
  stepX: 0,
  stepY: 0,
  isPlay: false,
  xIsNext: true
};

const game = (state = initiateState, action) => {
  switch (action.type) {
    case 'HANDLE_CLICK':
      return {
        ...state,
        x: action.x,
        y: action.y
      };
    case 'REFRESH_BOARD':
      return {
        ...state,
        boardInfo: action.boardInfo,
        data: action.data,
        player1: action.player1,
        player2: action.player2,
        stepX: action.stepX,
        stepY: action.stepY,
        isPlay: false
      };
    case 'SET_PLAYER':
      return {
        ...state,
        isSetPlayer1: parseInt(action.playerType) === 1,
        isSetPlayer2: parseInt(action.playerType) === 2
      };
    default:
      return state;
  }
};

export default game;
