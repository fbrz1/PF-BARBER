import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./redux/index.js";
import { CartProvider } from "./components/Shopping/ShoppingCart";
import "./index.css";
// import * as dotenv from "dotenv";
// dotenv.config();

//para el deploy
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <CartProvider>
            <App />
          </CartProvider>
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
