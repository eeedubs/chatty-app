/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, {Component} from 'react';

class ChatBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: '',
            userName: this.props.currentUser.name
        };
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    // Attached to the input for the user's message. Sets the state's message to the
    // input's target value
    handleMessageChange(event){
        this.setState({message: event.target.value});
    }

    // Attached to the input for the user's name. Sets the state's username to the
    // input's target value
    handleUsernameChange(event){
        this.setState({userName: event.target.value});
    }

    render() {

        // if the enter/return key is pressed:
        // declare variables equal to the user's message and the user's username
        // run the message and username through App's addMessage function (passed as prop)
        // Set the new message field and the state's message to empty strings
        const onEnter = (event) => {
            if (event.key === 'Enter' || event.key === 'Return') {
                const message = this.state.message;
                const user = this.state.userName;
                this.props.addMessage(message, user);
                event.target.value = '';
                this.setState({ message: ''});
            }
        };

        return (
            <footer className="chatbar">
                <input className="chatbar-username" onChange={this.handleUsernameChange} placeholder={this.props.currentUser.name} />
                <input className="chatbar-message" onChange={this.handleMessageChange} onKeyPress={onEnter} name="userMessage" placeholder="Type a message and hit ENTER" />
            </footer>
        );
    }
}
export default ChatBar;


