import React from "react";
import ReactDOM from "react-dom/client";
import App from "src/App";
import { ThemeProvider } from "@mui/material";
import theme from "src/theme/index";
import "src/styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "src/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "react-toastify/dist/ReactToastify.min.css";
import BackDropLoaderContextComp from "src/context/BackDropLoaderContext";
import PagesContextComp from "src/context/PagesContextProvider";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <PagesContextComp>
    <BackDropLoaderContextComp>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar
              newestOnTop
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover={true}
              theme="dark"
              color="pink"
              closeButton={true}
              className="toast-container"
            />
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </BackDropLoaderContextComp>
  </PagesContextComp>
  // </React.StrictMode>
);
