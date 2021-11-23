import { render } from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import './index.css';

render(
  <Router basename="/">
    <App />
  </Router>,
  document.getElementById('root'),
);

reportWebVitals();
