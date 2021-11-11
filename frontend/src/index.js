import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import {store} from './redux/store'
import {Provider} from 'react-redux'
import WebSocketProvider, { WebSocketContext } from './Components/socket/webSocket';

ReactDom.render(
  <Provider store={store} >
    <WebSocketProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </WebSocketProvider>
  </Provider>,
  document.getElementById('root')
);

