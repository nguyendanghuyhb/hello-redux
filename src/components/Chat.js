import React, {Component} from 'react';

class Chat extends Component {
    render() {
        return <form onSubmit={this.props.formSubmit}>
            <div className="form-group">
                    <textarea className="form-control" rows="2" placeholder="..."
                              value={this.props.message}
                              onChange={this.props.messageChange}
                              onKeyPress={this.props.messageKeyPress}/>
            </div>
            <div className="form-action">
                <button type="submit" className="btn btn-primary">Send</button>
            </div>
        </form>;
    }
}

export default Chat;