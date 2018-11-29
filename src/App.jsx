/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

// Application entrypoint.

// Load up the application styles
require('../styles/application.scss');


// Web socket connected to chatty_server
const socket = new WebSocket(`ws://${window.location.hostname}:3001`);


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
        messages: [],
        socket: ''
      };
      this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount </App />');
    const clients = [];
    // if the socket is open, notify the user in the browser console and push the websocket
    // variable into the client array
    socket.addEventListener('open', function () {
      console.log('Woohoo it\'s working');
      clients.push(socket);
    });

    // if a message is sent, log the message in the browser console
    socket.addEventListener('message', function (msg) {
      console.log('App.jsx: ', msg);
    })
    // window.scrollTo({ bottom: 0, behavior: 'smooth' });
  }
  

  addMessage(message, name) {
    // the message ID is equal to the length of the message array held in state plus 1
    let newId = this.state.messages.length + 1;
    // create the messageItem object
    let newMessageItem = {
      id: newId,
      type: 'incomingMessage',
      content: message,
      username: name
    }
    // add the next message to the end of the message array
    const newMessages = this.state.messages.concat(newMessageItem);
    // get the message (0.5 second delay), then...
    getMessage().then(() => {
      // replace the message object in state with the new message object
      this.setState({ messages: newMessages });
      // send the stringified message to the websocket server
      socket.send(JSON.stringify(newMessageItem));
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
