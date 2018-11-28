/* eslint-disable no-console */
import React, {Component} from 'react';
// import App from './App.jsx';

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

    handleMessageChange(event){
        this.setState({message: event.target.value});
    }

    handleUsernameChange(event){
        this.setState({userName: event.target.value});
    }

    render() {
        const onEnter = (event) => {
            if (event.key === 'Enter' || event.key === 'Return') {
                const message = this.state.message;
                console.log(message);
                const user = this.state.userName;
                console.log(user);
                this.props.addMessage(message, user);
                event.target.value = '';
                this.setState({
                    message: ''
                });
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


