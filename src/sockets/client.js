import io from 'socket.io-client';
import { initSession, getCookie } from '../cookie';
import { asyncRefreshBoard } from '../actions/game';

initSession();

// Socket-io
export const socket = io('/room'); // Connect to server

socket.on('ready', () => {
  socket.emit('join', {
    roomId: window.location.pathname,
    session: getCookie('session')
  });
  // console.log('ready');
});

export const refreshBoard = () => {
  socket.on('refreshBoard', asyncRefreshBoard(socket));
};
