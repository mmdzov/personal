import { createContext } from 'react';

const Context = createContext({
  data: {},
  user: {},
  about: {},
  notifications: {},
});

export default Context;
