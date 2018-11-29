/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, {Component} from 'react';

class ChatBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: '',
            userName: this.props.currentUser.name,
            usercount: 35,
            messagecount: 500
        };
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    // Attached to the input for the user's message. Sets the state's message to the
    // input's target value. If message is too long to be sent, alert the error.
    // Set the message count to 500 - the current count's length
    handleMessageChange(event){
        this.setState({
            message: event.target.value,
            messagecount: 500 - event.target.value.length
        });
    }

    // Attached to the input for the user's name. Sets the state's username to the
    // input's target value. If username is too long to be sent, alert the error.
    // Set the username count to 40 - the current count's length
    handleUsernameChange(event){
        this.setState({   
            userName: event.target.value,
            usercount: 35 - event.target.value.length
        });
    }

    render() {

        // if: the enter/return key is pressed, continue
            // if: username length exceeds 40 chars, alert error
            // else if: message length exceeds 500 chars, alert error
            // else: declare variables equal to the user's message and the user's username
                // run the message and username through App's addMessage function (passed as prop)
                // Set the new message field and the state's message to empty strings, and reset the messagecount
        const onEnter = (event) => {
            if (event.key === 'Enter' || event.key === 'Return'){
                if (this.state.userName.length > 35){
                    alert('Username exceeds the maximum character count (35)');
                } else if (this.state.message.length > 500){
                    alert('Message exceeds the maximum character count (500)');
                } else {
                    const message = this.state.message;
                    const user = this.state.userName;
                    this.props.addMessage(message, user);
                    event.target.value = '';
                    this.setState({ 
                        message: '',
                        messagecount: 500
                    });
                }
            }
        };

        return (
            <footer className="chatbar">
                <input className="chatbar-username" onChange={this.handleUsernameChange} placeholder={this.state.userName} />
                <span>{this.state.usercount}</span>
                <input className="chatbar-message" onChange={this.handleMessageChange} onKeyPress={onEnter} name="userMessage" placeholder="Type a message and hit ENTER" />
                <span>{this.state.messagecount}</span>
            </footer>
        );
    }
}
export default ChatBar;


