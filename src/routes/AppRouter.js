import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "../containers/Dashboard";
import Login from "../containers/Login";
import Reports from "../containers/Reports";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/reports" component={Reports} />
      <Route path="/" component={Login} />
    </Switch>
  </Router>
);

export default AppRouter;
