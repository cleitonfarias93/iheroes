import React from 'react';
import Proptypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

// Hooks
import useAuth from 'hooks/useAuth';

export default function PrivateRoute({
  component: Component,
  location,
  ...rest
}) {
  const { getAuth } = useAuth();

  const isLogged = !!getAuth();

  const handleRender = (props) => {
    if (isLogged) {
      return <Component {...props} />;
    }

    return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
  };

  return <Route {...rest} render={handleRender} />;
}

PrivateRoute.propTypes = {
  component: Proptypes.func.isRequired,
  location: Proptypes.shape({
    pathname: Proptypes.string,
  }),
};

PrivateRoute.defaultProps = {
  location: {
    pathname: '',
  },
};
