import { io } from 'socket.io-client';

const BASE_URL = 'http://localhost:4000';

const config = {
  withCredentials: true,
  transports: ['polling'],
  secure: true,
  // auth: {
  //   authorization: localStorage.getItem('token'),
  // },
  extraHeaders: {
    authorization: localStorage.getItem('token'),
  },
};

const socket = io(BASE_URL, config);

class SocketNamespaces {
  chat() {
    return io(`${BASE_URL}/chat`, {
      ...config,
    });
  }
}

export { socket, SocketNamespaces };
