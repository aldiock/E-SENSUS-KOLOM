import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Login,
  SignUp,
  Admin,
  DataJemaat,
  DataKKJemaat,
  Dashboard,
  AddUser,
  LihatData,
  UpdateUser,
} from "../../pages";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
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
        <Route path="/add-users">
          <AddUser />
        </Route>
        <Route path="/admin">
          <LihatData />
        </Route>
        <Route path="/update-user">
          <UpdateUser/>
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
