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
        currentUser: {name: 'Anonymous'},
        messages: [],
        socket: ''
      };
      this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    console.log('Inside componentDidMount </App />');
    // Web socket connected to chatty_server
    this.socket = new WebSocket(`ws://${window.location.hostname}:3001`);

    // assign a const variable to the global 'this'
    const _this = this;

    // if the socket is open, notify the user in the browser console
    this.socket.addEventListener('open', function(event){
      console.log('App.jsx: connected to the web socket.');
    });

    // if a message is received, pass it into a variable using JSON.parse()
    this.socket.addEventListener('message', function(event) {
      let newMessage = JSON.parse(event.data);
      console.log('New message received from the WebSocket: ', newMessage);

      // add the new message to the end of the previous list of messages in state
      const newReceivedMessages = _this.state.messages.concat(newMessage);
      // set the new state to equal the new message list
      _this.setState({ messages: newReceivedMessages })
    });
  
    // window.scrollTo({ bottom: 0, behavior: 'smooth' });
  }
   

  addMessage(message, name) {
    // create a new ID using the UUID generator
    let newId = uuid.v4();
    // create the messageItem object
    let newMessageItem = {
      id: newId,
      content: message,
      username: name
    }
    // add the next message to the end of the message array
    const newMessages = this.state.messages.concat(newMessageItem);
    // get the message (0.5 second delay), then...
    getMessage().then(() => {      
      // send the stringified message to the websocket server
      this.socket.send(JSON.stringify(newMessageItem));
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
