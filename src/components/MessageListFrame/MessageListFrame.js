import React, { Component, createRef } from 'react';
import ChatMessage from './../ChatMessage/ChatMessage';
import './MessageListFrame.css';

class MessageListFrame extends Component {

    constructor(props) {
        super(props);
        this.conHandler = props.conHandler;
        this.myID = props.conHandler.getUserID();
        this.state = {
            msgList: [] //list of {id:...,avatarSrc:"...",username:"...",timestamp:"...",message:"..."}
        };
        this.chatFrame = React.createRef();
    }
    componentWillMount() {

        this.conHandler.receiveMessege((msg) => {
            //get updated msg list and set the state
            let newMsgList = this.state.msgList.slice();
            newMsgList.push(msg);
            this.setState({msgList: newMsgList});
        });
    }

    goBottomIfOverflow = () => {
        let container = this.chatFrame.current;
        if (container != null)
            container.scrollTop = container.scrollHeight; //scroll the div to the button
    }

    componentDidUpdate() {
        this.goBottomIfOverflow();
    }
    render() {
        
        let messages = this.state.msgList.map((msg, indx) => 
            <ChatMessage message={msg} ID={this.conHandler.getUserID()} 
            key={"chatMessage-" + indx} />);
        
        return (
            <div id="ChatScreenFrameBody" ref={this.chatFrame} >
                {messages}
            </div>
        );
    }

}

export default MessageListFrame;