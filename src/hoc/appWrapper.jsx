import { Provider } from 'react-redux';
import { store } from '../store/store';
import { useState, useEffect } from 'react';
import { persistStore } from 'redux-persist';
import Loading from '../components/Loading/Loading';

const appWrapper = (Component) => () => {
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    persistStore(store, {}, () => {
      setRehydrated(true);
    });
  }, []);

  if (!rehydrated) return <Loading />;
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
};

export default appWrapper;
