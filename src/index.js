import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react'
import { ClientsStore as clientsStore } from './stores/clientsStore'
import { SnackbarProvider } from 'notistack';


const ClientsStore = new clientsStore()
const stores = {ClientsStore}

ReactDOM.render(
  <Provider {...stores}>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
