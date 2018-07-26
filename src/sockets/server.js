const _ = require('lodash');
const constants = require('../constants');

const m = constants.LENGTH;
const pointToWin = constants.POINT_TO_WIN;
const { createData } = constants;
const boardMap = {};

// attach the .equals method to Array's prototype to call it on any array
/* Array.prototype.equals = array => {
  // if the other array is a false value, return
  if (!array) return false;

  // compare lengths - can save a lot of time
  if (this.length !== array.length) return false;

  for (let i = 0, l = this.length; i < l; i += 1) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i])) return false;
    } else if (this[i] !== array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
}; */

const matchData = (count, versionData, data) =>
  /* if (versionData[count].equals(data) === false) {
    const c = count - 1;
    const matData =
      typeof versionData[c] !== 'undefined' ? versionData[c] : data;
    matchData(c, versionData, matData);
  } */
  data;

function nextStep(row, column, sRow, sColumn, times) {
  const nextRow = row + sRow * times;
  const nextColumn = column + sColumn * times;
  if (m <= nextRow || nextRow < 0 || m <= nextColumn || nextColumn < 0)
    return null;
  return { x: nextRow, y: nextColumn };
}

function checkDirections(data, row, column, sRow, sColumn) {
  let t;
  const check = [{ x: row, y: column }];
  const currentPointValue = data[row][column];
  let nextPoint;
  for (t = 1; t < 5; t += 1) {
    nextPoint = nextStep(row, column, sRow, sColumn, t);
    if (!nextPoint || data[nextPoint.x][nextPoint.y] !== currentPointValue) {
      break;
    }
    check.push(nextPoint);
  }

  for (t = 1; t < 5; t += 1) {
    nextPoint = nextStep(row, column, -sRow, -sColumn, t);
    if (!nextPoint || data[nextPoint.x][nextPoint.y] !== currentPointValue) {
      break;
    }
    check.push(nextPoint);
  }

  return check;
}

function checkResult(data, row, column) {
  const directions = [
    { stepX: 0, stepY: 1 },
    { stepX: 1, stepY: 1 },
    { stepX: 1, stepY: 0 },
    { stepX: 1, stepY: -1 }
  ];
  for (let i = 0; i < directions.length; i += 1) {
    const d = directions[i];
    const check = checkDirections(data, row, column, d.stepX, d.stepY);
    if (check.length === pointToWin) {
      return check;
    }
  }
  return false;
}

function createObject(color) {
  const obj = {};
  let i;
  for (i = 0; i < color.length; i += 1) {
    const { x } = color[i];
    const { y } = color[i];
    if (!(x in obj)) {
      obj[x] = {};
    }
    obj[x][y] = true;
  }
  return obj;
}

module.exports = io => {
  io.of('/room').on('connection', soc => {
    const socket = soc;
    socket.on('join', ({ roomId, session }) => {
      socket.join(roomId);
      socket.roomId = roomId;
      socket.session = session;
      boardMap[roomId] = boardMap[roomId] || {
        version: [createData()],
        count: 0,
        data: createData(),
        player1: '',
        player2: '',
        stepX: 0,
        stepY: 0,
        color: [],
        messages: []
      };
      const roomInfo = boardMap[roomId];
      roomInfo.players = roomInfo.players || {}; // Khoi tao player = {} neu chua co
      roomInfo.players[session] = roomInfo.players[session] || {
        session
      }; // Khoi tao session = { } trong player neu chua co.
      const playerInfo = roomInfo.players[session]; // Khoi tao thong tin nguoi choi = session {}
      playerInfo.playerName =
        playerInfo.playerName ||
        `P${Date.now()
          .toString()
          .substr(-10)}`; // Them playerName vao thong tin nguoi choi
      io.of('/room')
        .in(roomId)
        .emit('refreshBoard');
    });
    /* socket.on('leave', ({roomId}) => {
                            console.log('leave');
                            socket.leave(roomId);
                            socket.session = '';
                        }); */
    socket.on('getBoardInfo', (data, cb) => {
      const roomInfo = boardMap[socket.roomId];
      cb({
        version: roomInfo.version,
        count: roomInfo.count,
        data: roomInfo.data,
        playerName: roomInfo.players[socket.session].playerName,
        listPlayer: _.values(roomInfo.players),
        player1: roomInfo.player1,
        player2: roomInfo.player2,
        stepX: roomInfo.stepX,
        stepY: roomInfo.stepY,
        color: createObject(roomInfo.color),
        isWin: roomInfo.color.length > 0,
        messages: roomInfo.messages
      });
    });
    socket.on('changeUsername', ({ playerName }) => {
      const roomInfo = boardMap[socket.roomId];
      const player = roomInfo.players[socket.session];
      player.playerName = playerName;
      io.of('/room')
        .in(socket.roomId)
        .emit('refreshBoard');
    });
    socket.on('setPlayer', ({ type }) => {
      const roomInfo = boardMap[socket.roomId];
      if (roomInfo.count > 0) {
        return;
      }
      const player = roomInfo.players[socket.session];
      const currentPlayer = roomInfo[`player${type}`];
      const currentOtherPlayer =
        roomInfo[`player${parseInt(type) === 1 ? 2 : 1}`];
      if (currentPlayer) {
        if (currentPlayer.session === socket.session) {
          roomInfo[`player${type}`] = '';
          io.of('/room')
            .in(socket.roomId)
            .emit('refreshBoard');
        }
        return;
      }
      if (currentOtherPlayer && currentOtherPlayer.session === socket.session) {
        return;
      }
      roomInfo[`player${type}`] = player;
      io.of('/room')
        .in(socket.roomId)
        .emit('refreshBoard');
    });
    /* socket.on('playGame', () => {
                            io.of('/room').in(socket.roomId).emit('refreshBoard');
                        }); */
    socket.on('touch', ({ x, y }) => {
      const roomInfo = boardMap[socket.roomId];
      if (roomInfo.color.length) {
        return;
      }
      if (!roomInfo.player1 || !roomInfo.player2) {
        return;
      }
      if (
        roomInfo.count % 2 === 0 &&
        roomInfo.player1 &&
        roomInfo.player1.session === socket.session
      ) {
        roomInfo.data = matchData(
          roomInfo.count,
          roomInfo.version,
          roomInfo.data
        );
        roomInfo.count += 1;
        roomInfo.data[x][y] = '✘';
        roomInfo.version[roomInfo.count] = roomInfo.data;
        const color = checkResult(roomInfo.data, x, y);
        if (color) {
          roomInfo.color = color;
        }
        io.of('/room')
          .in(socket.roomId)
          .emit('refreshBoard');
      }
      if (
        roomInfo.count % 2 === 1 &&
        roomInfo.player2 &&
        roomInfo.player2.session === socket.session
      ) {
        roomInfo.data = matchData(
          roomInfo.count,
          roomInfo.version,
          roomInfo.data
        );
        roomInfo.count += 1;
        roomInfo.data[x][y] = 'O';
        roomInfo.version[roomInfo.count] = roomInfo.data;
        const color = checkResult(roomInfo.data, x, y);
        if (color) {
          roomInfo.color = color;
        }
        io.of('/room')
          .in(socket.roomId)
          .emit('refreshBoard');
      }
    });
    socket.on('newGame', () => {
      const roomInfo = boardMap[socket.roomId];
      if (!roomInfo.color.length) {
        return;
      }
      if (
        socket.session !== roomInfo.player1.session &&
        socket.session !== roomInfo.player2.session
      ) {
        return;
      }
      roomInfo.version = [createData()];
      roomInfo.data = createData();
      roomInfo.color = [];
      roomInfo.count = 0;
      io.of('/room')
        .in(socket.roomId)
        .emit('refreshBoard');
    });
    socket.on('chat', ({ message }) => {
      const roomInfo = boardMap[socket.roomId];
      const player = roomInfo.players[socket.session];
      roomInfo.messages.push({
        name: player.playerName,
        message
      });
      if (roomInfo.messages.length > 20) {
        roomInfo.messages.shift();
      }
      io.of('/room')
        .in(socket.roomId)
        .emit('refreshBoard');
    });
    socket.emit('ready');
  });
};
