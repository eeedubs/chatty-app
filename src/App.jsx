/* eslint-disable no-console */
import React, {Component} from 'react';

// Application entrypoint.

// Load up the application styles
require('../styles/application.scss');

// Render the top-level React component
// eslint-disable-next-line no-unused-vars
import ReactDOM from 'react-dom';
import ChatBar from './ChatBar.jsx'; 
// eslint-disable-next-line no-unused-vars
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

// eslint-disable-next-line no-unused-vars
// function getMessage() {
//   return new Promise(resolve => {
//     setTimeout(resolve, 3000);
//   });
// }

class App extends Component {
  // In the constructor, the properties (props) are set across all the JSX files
  // the structure is this.state.
  constructor(props){
    super(props);
    this.state = {
        currentUser: {name: 'Bob'},
        messages : [
          {
            type: 'incomingMessage',
            content: 'I won\'t be impressed with technology until I can download food.',
            username: 'Anonymous1'
          },
          {
            type: 'incomingNotification',
            content: 'Anonymous1 changed their name to nomnom',
          },
          {
            type: 'incomingMessage',
            content: 'I wouldn\'t want to download Kraft Dinner. I\'d be scared of cheese packet loss.',
            username: 'Anonymous2'
          },
          {
            type: 'incomingMessage',
            content: '...',
            username: 'nomnom'
          },
          {
            type: 'incomingMessage',
            content: 'I\'d love to download a fried egg, but I\'m afraid encryption would scramble it',
            username: 'Anonymous2'
          },
          {
            type: 'incomingMessage',
            content: 'This isn\'t funny. You\'re not funny',
            username: 'nomnom'
          },
          {
            type: 'incomingNotification',
            content: 'Anonymous2 changed their name to NotFunny',
          }
        ]
      };
      this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    // getMessages().then(() => {
      window.scrollTo({ bottom: 0, behavior: 'smooth' });
      console.log('componentDidMount <App />');
      setTimeout(() => {

        console.log('Simulating incoming message');

        const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
        const messages = this.state.messages.concat(newMessage)

        // Calling setState will trigger a call to render() in App and all child components.
        this.setState({messages: messages})
      }, 3000);
    }
  


  addMessage(message, name) {
    let newMessageItem = {
      // id: 5,
      content: message,
      username: name
    }
    const newMessages = this.state.messages.concat(newMessageItem);
    this.setState({ messages: newMessages });
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
