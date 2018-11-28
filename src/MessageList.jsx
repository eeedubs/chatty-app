/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
      <main className="messages">
        {
            this.props.messages.map((currentMessage, index)=>{
                return <Message message = {currentMessage} key={index}  />  
            })
        }
      </main>
    );
  }
}
export default MessageList;


