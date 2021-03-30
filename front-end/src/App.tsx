import { Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import { observer } from "mobx-react-lite";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";

const App = observer(() => {
  return (
    <div className="App">
      <Route path="/" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/notes" component={Home} />
    </div>
  );
});

export default App;
