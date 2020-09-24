import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MessageScreen from "./components/MessageScreen";
import { State } from "./context/State";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SingIn";

function App() {
  return (
    <State>
      <BrowserRouter>
        <MessageScreen />
        <div className="wrapper">
          <Switch>
            <Route path={"/"} exact component={SignIn} />
            <Route path={"/signup"} exact component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    </State>
  );
}

export default App;
