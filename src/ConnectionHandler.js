
import io from 'socket.io-client';

class ConnectionHandler {

    constructor(){
        this.serverPath = 'https://spotim-demo-chat-server.herokuapp.com' ;
        this.socket = this.connect();
        this.userID = '';
    }

    connect() {
        return io(this.serverPath);
    }

    sendMessage(msg) {
        this.socket.emit('spotim/chat', msg);
    }

    receiveMessege(updateList) {
        this.socket.on('spotim/chat', (message) => {
            updateList(message);
        });
    }

    setUserID = (id) => {
        this.userID = id;
    }

    getUserID = () => {
        return this.userID;
    }
}  

export default ConnectionHandler;