import { Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import { observer } from "mobx-react-lite";
import Home from "./Pages/Home/Home";

const App = observer(() => {
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   axios.post("http://localhost:5000/auth/login", state, {
  //     withCredentials: true
  //   });
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({ ...state, [e.target.name]: e.target.value });
  // };

  return (
    <div className="App">
      <Route path="/" exact component={Login} />
      <Route path="/notes" component={Home} />
    </div>
  );
});

export default App;
