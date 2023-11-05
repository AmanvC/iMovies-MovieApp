import { io } from 'socket.io-client';

const ENDPOINT = process.env.REACT_APP_PRODUCTION === 'true' ? process.env.REACT_APP_SOCKET_PRODUCTION_URL : process.env.REACT_APP_SOCKET_LOCAL_URL;
const socket = new io(ENDPOINT, {
  autoConnect: false,
  withCredentials: true
})

export default socket;