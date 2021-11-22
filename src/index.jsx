import { render } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import { BrowserRouter as Router } from 'react-router-dom';

render(
  <Router basename='/'>
    <App />
  </Router>,
  document.getElementById('root'),
);

reportWebVitals();
