import { io } from 'socket.io-client';

const BASE_URL = 'http://localhost:4000';

const config = {
  withCredentials: true,
  transports: ['polling'],
  secure: true,
};

const headers = {
  authorization: localStorage.getItem('token'),
};

const socket = io(BASE_URL, {
  ...config,
  extraHeaders: headers,
});
// const socketAdmin = io(`${BASE_URL}/admin`, {
//   ...config,
//   forceNew: true,
//   auth: {
//     ...headers,
//   },
// });

class SocketNamespaces {
  chat() {
    return io(`${BASE_URL}/chat`, {
      ...config,
    });
  }
}

export { socket, SocketNamespaces };
