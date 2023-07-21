import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/index";
import "./styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "src/store";
import { Provider } from "react-redux";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
