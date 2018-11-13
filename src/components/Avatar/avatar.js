import React, { Component } from 'react';


class Avatar extends Component {

    constructor(props) {
        super(props);
        this.state = {
          imgSrc: props.avatarSrc,
          imgSize: props.imgSize,
        };
      }

      handleUserAvatar = () => {
          this.props.clickFunc(this.state.imgSrc);
      }

    render() {
        
        return (
                    <img width={this.state.imgSize} height={this.state.imgSize} 
                        className="img-thumbnail" 
                        src={this.state.imgSrc} 
                        onClick={this.handleUserAvatar}
                        alt="avatar"
                        />
        );
    }
}

export default Avatar;