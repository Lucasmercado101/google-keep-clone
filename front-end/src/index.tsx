import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import ThemeProvider from "./ThemeProvider";
import GlobalStateProvider from "./StateProvider";
import { QueryClientProvider, QueryClient } from "react-query";

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GlobalStateProvider>
        <QueryClientProvider client={client}>
          <ThemeProvider>
            <App />
            <CssBaseline />
          </ThemeProvider>
        </QueryClientProvider>
      </GlobalStateProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
