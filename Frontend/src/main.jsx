// "main.jsx" starts the react application and connect redux to the app



import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";
import {Provider} from "react-redux"

import "./css/responsive.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* wrapping the app inside the provider so that the app can access the redux store. This connects the react app to the redux store.*/}
    <Provider store={store}>
      <App/>
    </Provider>
    
  </StrictMode>
);
