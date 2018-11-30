/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
// server.js

const WebSocket = require('ws');
const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');
const clients = [];

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// modular function that sends any kind of data to the clients
function broadcast(anyData) {
  wss.clients.forEach(function(client) {
    if (client.readyState === WebSocket.OPEN) {
      console.log('The client\'s WebSocket is OPEN. Passing the data to App.JS: ', anyData);
      client.send(JSON.stringify(anyData));
    }
  })
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // send the size of the active client list to the user
  let usersOnline = {
    type: 'clientInformation',
    size: wss.clients.size
  }
  broadcast(usersOnline);

  // upon receiving a message, parse the message and log it
  ws.on('message', function incoming(message) {
    const data = JSON.parse(message);
    console.log('Received message from App.js: ', data);    

    // switch the data type to incoming notification or incoming data 
    let newId = uuid.v4();
    data.id = newId;
    
    switch (data.type){
      case 'postNotification':
        data.type = 'incomingNotification'
        break
      case 'postMessage':
        data.type = 'incomingMessage'
        break
      default:
        throw new Error('Unknown data type: ' + data.type);
    }
    // If a client has an open connection, send the stringified data to the client
    broadcast(data);
  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    broadcast(usersOnline);
  });
});
