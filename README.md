ChattyApp Project
=====================

ChattyApp is a web application that employs real-time functionality where the user does not have to reload the page in order to see updates. 

ChattyApp allows users to communicate with each other without having to register accounts. U

sers are able to change their usernames, which will send an alert to other usernames to alert them of this change. 

Restrictions are in place on the username length (between 1 and 35 characters) and on the message length (between 1 and 500 characters). 

ChattyApp uses React, HTML, CSS and SASS on the front end, and Node (including Webpack and Babel), Express, and WebSockets on the back end.


### Dependencies

* babel-core
* [babel-loader](https://github.com/babel/babel-loader)
* babel-preset-es2015
* babel-preset-react
* css-loader
* node-sass
* React
* React-DOM
* sockjs-client
* Style-loader
* Webpack
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

### Screenshots

![Screenshot of a Chatty App conversation between 4 clients](https://github.com/eeedubs/chatty-app/blob/master/docs/chatty-app-conversation.png)

![Screenshot of Chatty App with an error message for too many characters entered](https://github.com/eeedubs/chatty-app/blob/master/docs/chatty-app-errors.png)


## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Navigate to the main project directory and start the web server using the `npm run local` command. The app will be served at <http://localhost:3000/>.
4. Navigate to the WebSocket directory (called 'chatty_server') and start the web socket using the `npm start` command.  
5. Go to <http://localhost:3000/> in your browser.