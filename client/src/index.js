import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./redux/index.js";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
// import * as dotenv from "dotenv";
// dotenv.config();

//para el deploy
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="henrybarber.us.auth0.com"
      clientId="Hm7DVdsniGdAC6DGaaaYaR7YMnP6szg0"
      redirectUri={window.location.origin}
    >
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <App />
          </Switch>
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
