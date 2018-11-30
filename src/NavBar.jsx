import React, {Component} from 'react';

class NavBar extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty App</a>
                < span className="users-online">Users Online: {this.props.clientSize}</span>
            </nav>
        )
    }
}
export default NavBar;