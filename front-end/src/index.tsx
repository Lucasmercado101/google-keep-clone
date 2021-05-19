import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CssBaseline } from "@material-ui/core";
import ThemeProvider from "./ThemeProvider";
import GlobalStateProvider from "./StateProvider";
import { QueryClientProvider, QueryClient } from "react-query";
import { RouterProvider } from "react-router5";
import createRouter from "./Router";
import FSMProvider from "./RouterContext";

const router = createRouter();

const client = new QueryClient();

router.start(() => {
  ReactDOM.render(
    <React.StrictMode>
      <FSMProvider>
        <RouterProvider router={router}>
          <GlobalStateProvider>
            <QueryClientProvider client={client}>
              <ThemeProvider>
                <App />
                <CssBaseline />
              </ThemeProvider>
            </QueryClientProvider>
          </GlobalStateProvider>
        </RouterProvider>
      </FSMProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
