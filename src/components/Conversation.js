import React, {Component} from 'react';

class Conversation extends Component {
    render() {
        const messages = this.props.messages;
        let conversation = [];
        if (typeof messages !== "undefined" && messages.length) {
            for (let i = 0; i < messages.length; i++) {
                conversation.push(<li key={i} className={messages[i].name === this.props.playerName ? 'red' : 'blue'}>{messages[i].name}: {messages[i].message}</li>)
            }
        }
        return <figure className="highlight">
            <ul>
                {conversation}
            </ul>
        </figure>;
    }
}

export default Conversation;