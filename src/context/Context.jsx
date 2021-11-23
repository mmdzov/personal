import { createContext } from 'react';

const Context = createContext({
  data: {},
  user: {},
  about: {},
  notifications: {},
  setData: () => {},
});

export default Context;
