import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login, SignUp } from "../../pages";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
