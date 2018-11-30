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
          this.props.messages.map((currentMessage)=>{
              return (
                <Message 
                  messageFromList={currentMessage} 
                  type={currentMessage.type} 
                  key={currentMessage.id}  
                />  
              )
          })
        }
      </main>
    );
  }
}
export default MessageList;


