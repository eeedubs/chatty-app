/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

// Application entrypoint.

// Load up the application styles
require('../styles/application.scss');

// Render the top-level React component
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Render the children components
import ChatBar from './ChatBar.jsx'; 
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';


function getMessage() {
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
}

class App extends Component {
  // In the constructor, the properties (props) are set across all the JSX files
  // the structure is this.state.
  constructor(props){
    super(props);
    this.state = {
        currentUser: {name: 'Bob'},
        messages : [
          // {
          //   type: 'incomingMessage',
          //   content: 'I won\'t be impressed with technology until I can download food.',
          //   username: 'Anonymous1'
          // },
          // {
          //   type: 'incomingNotification',
          //   content: 'Anonymous1 changed their name to nomnom',
          // },
          // {
          //   type: 'incomingMessage',
          //   content: 'I wouldn\'t want to download Kraft Dinner. I\'d be scared of cheese packet loss.',
          //   username: 'Anonymous2'
          // },
          // {
          //   type: 'incomingMessage',
          //   content: '...',
          //   username: 'nomnom'
          // },
          // {
          //   type: 'incomingMessage',
          //   content: 'I\'d love to download a fried egg, but I\'m afraid encryption would scramble it',
          //   username: 'Anonymous2'
          // },
          // {
          //   type: 'incomingMessage',
          //   content: 'This isn\'t funny. You\'re not funny',
          //   username: 'nomnom'
          // },
          // {
          //   type: 'incomingNotification',
          //   content: 'Anonymous2 changed their name to NotFunny',
          // }
        ]
      };
      this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    window.scrollTo({ bottom: 0, behavior: 'smooth' });
  }
  
  addMessage(message, name) {
    let newId = this.state.messages.length + 1;
    let newMessageItem = {
      id: newId,
      content: message,
      username: name
    }
    const newMessages = this.state.messages.concat(newMessageItem);
    getMessage().then(() => {
      this.setState({ messages: newMessages });
    });
  }

  render() {
    return (
      <div>
        {/* We pass the local (state) messages through MessageList.jsx, which pulls the HTML structure from Message.jsx */}
        <MessageList messages = {this.state.messages} />
        <ChatBar 
        currentUser={this.state.currentUser} 
        addMessage={this.addMessage} 
        />
      </div>
    );
  }
}
export default App;
