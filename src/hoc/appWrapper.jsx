import { Provider } from 'react-redux';
import { store } from '../store/store';

const appWrapper = (Component) => () => {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
};

export default appWrapper;
