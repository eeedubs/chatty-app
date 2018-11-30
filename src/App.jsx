/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

// Application entrypoint.

// Load up the application styles
require('../styles/application.scss');

// unique user id generator
const uuid = require('uuid');

// Render the top-level React component
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Render the children components
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx'; 
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

function delayMessage() {
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
        currentUser: {name: 'Anonymous'},
        messages: [],
        socket: '',
        clientSize: 0
      };
      this.addMessage = this.addMessage.bind(this);
      this.changedName = this.changedName.bind(this);
  }

  componentDidMount() {
    // Web socket connected to chatty_server
    // assign a const variable to the global 'this'
    console.log('Inside componentDidMount </App />');
    this.socket = new WebSocket(`ws://${window.location.hostname}:3001`);
    const _this = this;

    // if the socket is open, notify the user in the browser console
    this.socket.addEventListener('open', function(event){
      console.log('App.jsx: connected to the web socket.');
    });

    // if a message is received, pass it into a variable using JSON.parse()
    this.socket.addEventListener('message', function(event) {
      let data = JSON.parse(event.data);
      let newReceivedMessages;

      switch(data.type) {
        // if the incoming event is a message, log it, add it to the messages, then set it within the state
        case 'incomingMessage':
          console.log('New message received from the WebSocket: ', data);   
          newReceivedMessages = _this.state.messages.concat(data); 
          _this.setState({ messages: newReceivedMessages })
          break;
        // if the incoming event is a notification: log it, add it to the messages, then set it within the state
        case 'incomingNotification':
          console.log('New notification received from the WebSocket: ', data);
          newReceivedMessages = _this.state.messages.concat(data);
          _this.setState({ messages: newReceivedMessages })
          break;
        // if the incoming event is client information, log it, then set it within the state
        case 'clientInformation':
          console.log('New client information received from the WebSocket: ', data);
          _this.setState({ clientSize: data.size });
          console.log("This is the size of the clients in state: ", _this.state.clientSize);
          break;
        // otherwise, throw an error with the data type
        default: 
          throw new Error('Unknown event type: ' + data.type);
      }
    });
    // window.scrollTo({ bottom: 0, behavior: 'smooth' });
  }

  changedName(oldName, newName){
    // create the newNotificationItem
    let newNotificationItem = {
      type: 'postNotification',
      content: `${oldName} has changed their name to ${newName}`
    }
    // delay the notification, then send the stringified message to the websocket server
    delayMessage().then(() => {
      this.socket.send(JSON.stringify(newNotificationItem));
    });
  }

  addMessage(message, name) {
    // create the messageItem object
    let newMessageItem = {
      type: 'postMessage',
      content: message,
      username: name
    }
    // delay the message, then send the stringified message to the websocket server
    delayMessage().then(() => {      
      this.socket.send(JSON.stringify(newMessageItem));
    });
  }

  render() {
    return (
      <div>
        {/* We pass the local (state) messages through MessageList.jsx, which pulls the HTML structure from Message.jsx */}
        <NavBar 
          clientSize={this.state.clientSize}
        />
        <MessageList 
          messages={this.state.messages} 
        />
        <ChatBar 
          currentUser={this.state.currentUser} 
          addMessage={this.addMessage} 
          changedName={this.changedName}
        />
      </div>
    );
  }
}
export default App;
