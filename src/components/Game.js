import React, {Component} from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import {asyncRefreshBoard, asyncHandleClick, asyncChangeUsername, asyncSetPlayer, asyncNewGame} from '../actions/game';
import {asyncHandleMessage, asyncHandleKeyPress, asyncChat} from '../actions/chat';
import Board from './Board';
import Conversation from './Conversation';
import Chat from './Chat';
// Init
iniSession();

function iniSession() {
    const session = getCookie('session');
    if (session) {
        return session;
    }
    return setCookie('session', Date.now().toString(), 365);
}


function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    return cvalue;
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Socket-io
let socket = io('/room');  // Connect to server
socket.on('ready', () => {
    socket.emit('join', {roomId: window.location.pathname, session: getCookie('session')});
    console.log('ready');
});

const mapStateToProps = state => {
    return {...state};
};

const mapDispatchToProps = {
    _asyncRefreshBoard: asyncRefreshBoard,
    _asyncSetPlayer: asyncSetPlayer,
    _asyncHandleClick: asyncHandleClick,
    _asyncChangeUsername: asyncChangeUsername,
    _asyncNewGame: asyncNewGame,
    _asyncChat: asyncChat,
    _asyncHandleMessage: asyncHandleMessage,
    _asyncHandleKeyPress: asyncHandleKeyPress
};

class Game extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        socket.on('refreshBoard', () => this.props._asyncRefreshBoard(socket));
        socket.on('newGame', () => this.props._asyncNewGame(socket));
    }

    componentWillUnmount() {
        socket.removeListener('refreshBoard', () => this.props._asyncRefreshBoard(socket));
        socket.removeListener('newGame', () => this.props._asyncNewGame(socket));
    }

    render() {
        const {dispatch, game, chat} = this.props;
        const data = game.data;
        const boardInfo = game.boardInfo;
        const version = boardInfo.version;
        const playerName = boardInfo.playerName;
        const isWin = boardInfo.isWin;
        const color = boardInfo.color;
        let choosePlayer1 = <button type="button" className="btn btn-lg" onClick={() => this.props._asyncSetPlayer(socket, 1)}>Choose <span className="red">✘</span></button>;
        let choosePlayer2 = <button type="button" className="btn btn-lg" onClick={() => this.props._asyncSetPlayer(socket, 2)}>Choose <span className="blue">O</span></button>;
        let pathName = window.location.pathname.split("/");
        let roomId = (typeof pathName === "undefined") ? "" : pathName[pathName.length - 1];

        let winner1 = '', winner2 = '', newGameBtn;
        if (isWin) {
            if (boardInfo.count % 2 === 1) {
                winner1 = <img src="/assets/images/trophy.png" width="50px"/>;
            } else {
                winner2 = <img src="/assets/images/trophy.png" width="50px"/>
            }
            newGameBtn = <button type="button" className="btn btn-red" onClick={() => this.props._asyncNewGame(socket)}>New game</button>
        }
        let status, action;
        if (typeof boardInfo === "undefined" || typeof boardInfo.player1 === "undefined" || typeof boardInfo.player2 === "undefined"
            || boardInfo.player1 === "" || boardInfo.player2 === ""
        ) {
            status = <div className="game-action"><h3>Waiting other player...</h3></div>;
        } else {
            status = '';//<button onClick={() => this.playGame()}>Play game</button>;
        }
        // action = isPlay ? '' : <div className="game-action">{status}</div>;
        // action = '';
        if (typeof boardInfo.player1 !== "undefined" && boardInfo.player1 !== "") {
            choosePlayer1 = <button type="button" className="btn btn-lg" onKeyUp={(event) => this.props._asyncChangeUsername(socket, event)} contentEditable={boardInfo.player1.playerName === playerName} suppressContentEditableWarning="true">
                {boardInfo.player1.playerName} <span className="green">✔</span>
            </button>;
        }
        if (typeof boardInfo.player2 !== "undefined" && boardInfo.player2 !== "") {
            choosePlayer2 = <button type="button" className="btn btn-lg" onKeyUp={(event) => this.props._asyncChangeUsername(socket, event)} contentEditable={boardInfo.player2.playerName === playerName} suppressContentEditableWarning="true">
                {boardInfo.player2.playerName} <span className="green">✔</span>
            </button>;
        }

        return (
            <div className="container">
                <nav className="navbar navbar-light" style={{backgroundColor: "#e3f2fd"}}>
                    <h1>Gomoku</h1>
                </nav>
                <div className="row">
                    <div className="col-md-6 col-lg-6">
                        <div className="game-board">
                            {status}
                            <Board
                                square={data}
                                color={color}
                                onClick={(x, y) => this.props._asyncHandleClick(socket, x, y, version)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="game-info">
                            <article className="card-group-item">
                                <header className="card-header">
                                    <h4 className="title text-center">Room: {roomId}</h4>
                                </header>
                            </article>
                            <div className="row text-center" style={{paddingTop: "5px"}}>
                                <div className="col-md-6 col-lg-6">
                                    {choosePlayer1}
                                </div>
                                <div className="col-md-6 col-lg-6">
                                    {choosePlayer2}
                                </div>
                            </div>
                            <div className="row text-center" style={{paddingTop: "5px"}}>
                                <div className="col-md-6 col-lg-6">
                                    {winner1}
                                </div>
                                <div className="col-md-6 col-lg-6">
                                    {winner2}
                                </div>
                            </div>
                            <div className="row text-center">
                                <div className="col-md-12 col-lg-12">
                                    {newGameBtn}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-lg-12" style={{position: "absolute", bottom: 0}}>
                                    <Conversation
                                        messages={boardInfo.messages}
                                        playerName={playerName}
                                    />
                                    <Chat
                                        formSubmit={(event) => this.props._asyncChat(socket, chat.message, event)}
                                        message={chat.message}
                                        messageChange={(event) => this.props._asyncHandleMessage(playerName, event)}
                                        messageKeyPress={(event) => this.props._asyncHandleKeyPress(socket, chat.message, event)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);