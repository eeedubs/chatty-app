
import React, {Component} from 'react';

class Message extends Component {

  render() {
    if (this.props.messageFromList.type === 'incomingMessage'){
      return (
        <div className="message">
          <span className="message-username">{this.props.messageFromList.username}</span>
          <span className="message-content">{this.props.messageFromList.content}</span>
        </div>
      )
    } else if (this.props.messageFromList.type === 'incomingNotification'){ 
      return (
        <div className="message system">
        {this.props.messageFromList.content}
      </div>
      )
    } else {
      // eslint-disable-next-line no-console
      console.error("Unidentified message type: ", this.props.messageFromList.type);
    }
  }
}
export default Message;