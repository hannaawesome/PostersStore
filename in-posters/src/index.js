import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./pages/chatRoom/common.css";
import "./pages/chatRoom/chatroom.css";
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter } from 'react-router-dom';
import InPosterApp from "./components";
import CartContextProvider from "./contexts/CartContext";
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'

ReactDOM.render(
  <React.StrictMode>
      <CartContextProvider>
          <ThemeProvider theme={theme}>
          <BrowserRouter>
                  <div>
                  <InPosterApp/>
              </div>
       </BrowserRouter>
          </ThemeProvider>
       </CartContextProvider>
          <div>

          </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
