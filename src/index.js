import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import AuthContextProvider from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
