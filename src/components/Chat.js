import React, { Component } from 'react';
import { connect } from 'react-redux';
import { socket } from '../sockets/client';
import {
  asyncChat,
  asyncHandleKeyPress,
  asyncHandleMessage
} from '../actions/chat';

const mapStateToProps = state => {
  return { ...state.chat };
};

const mapDispatchToProps = {
  _asyncChat: asyncChat,
  _asyncHandleMessage: asyncHandleMessage,
  _asyncHandleKeyPress: asyncHandleKeyPress
};

class Chat extends Component {
  render() {
    return (
      <form
        onSubmit={event =>
          this.props._asyncChat(socket, this.props.message, event)
        }
      >
        <div className="form-group">
          <textarea
            className="form-control"
            rows="2"
            placeholder="..."
            value={this.props.message}
            onChange={event =>
              this.props._asyncHandleMessage(this.props.playerName, event)
            }
            onKeyPress={event =>
              this.props._asyncHandleKeyPress(socket, this.props.message, event)
            }
          />
        </div>
        <div className="form-action">
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </div>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
