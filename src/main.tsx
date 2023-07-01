import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ErrorBoundaryMessage } from "./components/ErrorBoundaryMessage.tsx";

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorBoundaryMessage />}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
