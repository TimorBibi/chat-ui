
const importAll = (r) => {
    return r.keys().map(r);
  }

export const avatarsImgs = importAll(require.context('./images/Avatars', false, /\.(png|jpe?g|svg)$/));


export const getTimeStamp = () => {
    let d = new Date();
    return d.getHours() + ":" + d.getMinutes();
}

export const getAvatar = (avatarNum) => {
    return avatarsImgs[avatarNum];
}

export const getNewID = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };