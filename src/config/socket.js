import { io } from 'socket.io-client';

const BASE_URL = 'http://localhost:4000';

const socket = io(BASE_URL);

class SocketNamespaces {
  chat() {
    return io(`${BASE_URL}/chat`, {
      transports: ['polling'],
      auth: {
        authorization: '',
        // authorization:
        //   'eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2MWEzOWRjMzA4MWE2MjVmZWRkY2VmNjYiLCJpc0FkbWluIjp0cnVlLCJhdmF0YXIiOiJodHRwOi8vbG9jYWxob3N0OjQwMDAvYXBpL3VwbG9hZHMvYXZhdGFyLWVzc2Zydm9nN3kuanBnIiwidXNlcm5hbWUiOiJtb2hhbW1hZCIsImVtYWlsIjoibXpvdjkzOUBnbWFpbC5jb20iLCJfX3YiOjB9.hkyABfU_Ba_zbuUjlABm1IvSOc6p17EJcm4kTK6rdvk',
      },
    });
  }
}

export { socket, SocketNamespaces };
