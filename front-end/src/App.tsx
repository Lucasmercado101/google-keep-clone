import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [state, setState] = useState({ userName: "", password: "" });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("http://localhost:5000/auth/login", state, {
      withCredentials: true
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input
            value={state.userName}
            name="userName"
            placeholder="userName"
            onChange={handleChange}
          />
          <input
            value={state.password}
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
        <button
          onClick={(e) => {
            axios.get("http://localhost:5000/auth/me", {
              withCredentials: true
            });
          }}
        >
          test
        </button>
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
