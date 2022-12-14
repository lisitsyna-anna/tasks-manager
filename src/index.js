import { Provider } from 'react-redux';
import { store } from 'redux/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { Toaster } from 'react-hot-toast';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster position="top-right" reverseOrder={false} />
      <App />
    </Provider>
  </React.StrictMode>
);
