import React, { Component } from 'react';
import Avatar from './../Avatar/avatar';
import './ChatMessage.css';

class ChatMessage extends Component {

    constructor (props) {
        super(props);
        this.myID = props.ID
        this.state = { //{id:...,avatarSrc:"...",username:"...",timestamp:"...",message:"..."}
            id: props.message.id,
            avatarSrc: props.message.avatarSrc,
            username: props.message.username,
            timestamp: props.message.timestamp,
            message: props.message.message,
        };
    }

    render () {
        let ownerMessage = (this.state.id === this.myID ? 'myMessage' : '');
        return (
            <div className="messageContainer">
                <Avatar avatarSrc={this.state.avatarSrc}
                    imgSize ={40}
                    clickFunc={() => null}
                    id="messageAvatar"
                    />
                    <div className="basicMessage">
                        <p id="messageUserame">{this.state.username}:</p>
                        <p><span id="messageText" className={ownerMessage} >
                        {this.state.message} </span><span id='messageTime' >{this.state.timestamp}</span>
                        </p>
                    </div>
            </div>
        );
    }
}

export default ChatMessage;