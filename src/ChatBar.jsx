/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, {Component} from 'react';

class ChatBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: '',
            messageCount: 500,
            userName: this.props.currentUser.name,
            userCount: 35
        };
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    // sets the message in local state to enter the new message in the input
    // sets the messageCount to equal 500 minus the inputted message's length
    handleMessageChange(event){
        this.setState({
            message: event.target.value,
            messageCount: 500 - event.target.value.length
        });
    }

    // sets the userCount to equal 35 minus the inputted username's length
    handleUsernameChange(event){
        this.setState({   
            userCount: 35 - event.target.value.length
        });
    }

    render() {

        // assigns variable to old user (held in state) and the new user (input value)
        // if: the new username isn't the old username and is between 1 and 35 chars, continue:
            // run the changedName function with the old username and the new username
        const updateUser = (event) => {
            const oldUser = this.state.userName;
            const newUser = event.target.value;
            if (newUser !== oldUser && this.state.userCount >= 0 && this.state.userCount < 35){
                this.props.changedName(oldUser, newUser);
                this.setState({ userName: newUser });
            }
        }

        // if: the enter/return key is pressed, continue
            // if: username length exceeds 35 chars (x < 0), alert error
            // else if: username length is empty (x === 35), alert error
            // if: message length exceeds 500 chars (y < 0), alert error
            // else if: message length is empty (y === 500), alert error
            // if no problems: declare variables equal to the user's message and the user's username
                // run the user message and username through the addMessage function
                // clear the message field, the state's message, and reset the message count
        const sendMessage = (event) => {
            let shouldReturn = true;
            if (event.key === 'Enter' || event.key === 'Return'){
                // if the username exceeds the maximum character count, return error
                if (this.state.userCount < 0){
                    alert('Username exceeds the maximum character count (35)');
                    shouldReturn = false;
                    // else if the username is empty and the username in state does not equal 'Anonymous', return error
                } else if (this.state.userCount === 35 && this.state.userName !== this.props.currentUser.name){
                    alert('Username cannot be empty.');
                    shouldReturn = false;
                }
                // if the message exceeds the maximum character count, return error
                if (this.state.messageCount < 0){
                    alert('Message exceeds the maximum character count (500)');
                    shouldReturn = false;
                    // else if the message is empty, return error
                } else if (this.state.messageCount === 500){
                    alert('Message field cannot be empty.');
                    shouldReturn = false;
                }
                // if no issue, continue
                if (shouldReturn){
                    const message = this.state.message;
                    const user = this.state.userName;
                    this.props.addMessage(message, user);
                    event.target.value = '';
                    this.setState({ 
                        message: '',
                        messageCount: 500
                    });
                }
            }
        };

        return (
            <footer className="chatbar">
                <input className="chatbar-username" onChange={this.handleUsernameChange} onBlur={updateUser} placeholder={this.state.userName} />
                <span>{this.state.userCount}</span>
                <input className="chatbar-message" onChange={this.handleMessageChange} onKeyPress={sendMessage} name="userMessage" placeholder="Type a message and hit ENTER" />
                <span>{this.state.messageCount}</span>
            </footer>
        );
    }
}
export default ChatBar;


