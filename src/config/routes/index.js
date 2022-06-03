import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Login,
  SignUp,
  Admin,
  DataJemaat,
  DataKKJemaat,
  Dashboard,
} from "../../pages";

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
        <Route path="/data-jemaat">
          <DataJemaat />
        </Route>
        <Route path="/data-kk-jemaat">
          <DataKKJemaat />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
