import React, { Component } from 'react';
import './App.css';
import ConnectionHandler from './../ConnectionHandler';
import MessageListFrame from './../components/MessageListFrame/MessageListFrame';
import MessageCreationFrame from './../components/MessageCreationFrame/MessageCreationFrame';

class App extends Component {

  constructor() {
    super();
    this.conHandler = new ConnectionHandler();
    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="MainFrame">
            <h1 className="chatHeader">Spot.im Chat</h1>
            <MessageListFrame conHandler={this.conHandler} className="MessagesFrame" />
            <MessageCreationFrame conHandler={this.conHandler} className="CreatMsg" />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
