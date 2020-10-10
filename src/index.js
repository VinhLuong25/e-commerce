import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import ScrollToTop from "./Common/ScrollToTop";

ReactDOM.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </>,
  document.getElementById("root")
);
