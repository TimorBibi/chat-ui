import React, { Component } from 'react';
import { Button, Image, Modal, Form} from 'semantic-ui-react';
import Avatar from './../Avatar/avatar';
import { avatarsImgs , getAvatar} from './../../functions';
import './AvatarsModal.css'

class AvatarsModal extends Component {

    constructor(props) {
        super(props);
        this.containerWidth = 0;
        this.state = {
            open: false,
            username: props.user.name,
            avatar: props.user.avatar
        };
      }

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }

    changeAvatar = (newAvatarSrc) => {
        this.setState({avatar: newAvatarSrc})
    }

    saveProps = () => {
        this.props.changeUserProps(this.state.username, this.state.avatar);
        this.setState({ open: false })
    }

    createAvatarsArray = () => {
        return avatarsImgs.map((val, indx) => {
            return <Avatar avatarSrc={getAvatar(indx)}
                    imgSize ={64}
                    clickFunc={(newAvatarSrc) => this.changeAvatar(newAvatarSrc)}
                    key={"choose-avatar-" + indx}
                    />;
        });
    }

    handleChange = (event) => {
        let eventName = event.target.name;
        this.setState({[eventName]: event.target.value });
    }

    handleKeyPress = (event) => {
        if (event.key === "Enter")  
              this.saveProps();
    }

    render() {

        const { open, closeOnEscape, closeOnDimmerClick } = this.state
        let avatars = this.createAvatarsArray();

        return (
            <div>
                <Image type="button" className="AvatarButton" 
                    src={this.state.avatar} onClick={this.closeConfigShow(true, false)} />
                <Modal open={open} closeOnEscape={closeOnEscape}
                    closeOnDimmerClick={closeOnDimmerClick}
                    onClose={this.close} size='small'
                    onKeyPress={this.handleKeyPress} >
                    <Form>
                        <Modal.Header className="spaced">
                            <Form.Input label="Username:" name="username"
                            placeholder={this.state.username} width={6}
                            onChange={this.handleChange} />
                        </Modal.Header>
                        <hr/>
                        <Modal.Content image className="spaced">
                            <img id="choosenAvatar" src={this.state.avatar} alt="choosenAvatar"/>
                            <Modal.Description className="avatarGrid"> {avatars} </Modal.Description>
                        </Modal.Content>
                        <hr/>
                        <Modal.Actions className="spaced">
                        <Button onClick={this.saveProps}
                            labelPosition='right' icon='checkmark'
                            content='Save' type="button" id="saveButton"
                        />
                        </Modal.Actions>
                    </Form>
            </Modal>
        </div>
        );
    }
}  

export default AvatarsModal;