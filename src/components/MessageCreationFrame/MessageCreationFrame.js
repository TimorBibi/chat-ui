import React, { Component } from 'react';
import {getTimeStamp, getNewID} from './../../functions'
import AvatarsModal from './../AvatarsModal/AvatarsModal';
import noneAvatar from './../../images/noneAvatar.png';
import { Button, Form, Label} from 'semantic-ui-react';
import './MessageCreationFrame.css'


class MessageCreationFrame extends Component {

    constructor(props) {
        super(props);
        this.conHandler = props.conHandler;
        this.state = {
            id: getNewID(),
            avatarSrc: noneAvatar,
            username: "User",
            message: '',
            popError: false,
        }
    }

    componentWillMount() {
        this.conHandler.setUserID(this.state.id);
    }

    handleChange = (event) => {
        let eventName = event.target.name;
        this.setState({[eventName]: event.target.value });
    }
    //submit the message after field validation 
    handleSubmit = (event) => {
        let time = getTimeStamp();
        this.setState({timestamp: time});
        if (this.formValidation()){
            //message form: {id:...,avatarSrc:"...",username:"...",timestamp:"...",message:"..."}
            this.conHandler.sendMessage({
                id: this.state.id,
                avatarSrc: this.state.avatarSrc,
                username:   this.state.username,
                timestamp: time,
                message: this.state.message,
            });
            this.setState({message: '', popError: false}); //clear message text
        }
        else
            this.setState({popError: true});
        event.preventDefault(); //Prevents page refresh
    }
    //return true for valid form
    formValidation = () => {
        if (this.state.username === "User")
            return false;
        else if (this.state.avatarSrc === noneAvatar)
            return false;
        else if (this.state.message === '')
            return false;
        else
            return true;
    }

    changeUserProps = (newName, newAvatarSrc) => {
        let toPop = false;
        if (newName === 'User' | newAvatarSrc === noneAvatar)
            toPop = true;
        this.setState({username: newName, avatarSrc: newAvatarSrc, popError: toPop});
    }

    handleKeyPress = (event) => {
        if (event.key === "Enter")  
              this.handleSubmit(event);
    }

    setError = () => {
        if (this.state.popError){
            if (this.state.message !== '')
                return <Label basic color="red" pointing="left" id="errorLabel">Choose name and avatar</Label>;
            else
                return <Label basic color="red" pointing="left" id="errorLabel">Enter message</Label>;
        }
        return null;
    }

    render() {
        let fieldError = this.setError();

        return (
            <Form onSubmit={this.handleSubmit} onKeyPress={this.handleKeyPress} className="CreateMassegeFrameBody">
                <Form.Group className='userProps'>
                    <AvatarsModal user={{name: this.state.username, avatar: this.state.avatarSrc}} 
                        changeUserProps={(newNAme, newAvatarSrc) => this.changeUserProps(newNAme, newAvatarSrc)}/>
                    <Form.Field id="userNameProp" name="userName" >{this.state.username}</Form.Field>
                    {fieldError}
                </Form.Group>
                <Form.Group id="messageDiv">
                    <Form.Input id="messageIput" name="message"
                        value={this.state.message}
                        placeholder="Type.." onChange={this.handleChange}/>
                    <Button type="submit" id="SendButton" content='Send' icon='send' labelPosition='left' />
                </Form.Group>
            </Form>
        );
    }
}

export default MessageCreationFrame;