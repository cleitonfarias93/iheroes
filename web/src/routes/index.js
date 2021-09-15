import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Context
import GlobalProvider from 'contexts/GlobalContext';

// Pages
import App from 'App';
import Login from 'pages/Login';
import Signup from 'pages/Signup/Signup';

// Routes
import PrivateRoute from './PrivateRoute';

const Routes = () => (
  <GlobalProvider>
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path="/" component={App} />
      </Switch>
    </Router>
  </GlobalProvider>
);

export default Routes;
