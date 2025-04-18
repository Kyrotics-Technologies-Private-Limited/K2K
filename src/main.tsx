import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {AuthInitializer} from "./AppProvider.tsx";
import { Provider } from 'react-redux';
import { store } from './store/store';


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthInitializer>
        <App />
      </AuthInitializer>
    </Provider>
  </StrictMode>
);
