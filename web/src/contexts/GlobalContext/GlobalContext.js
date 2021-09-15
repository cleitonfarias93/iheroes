import React, { createContext, useState } from 'react';
import Proptypes from 'prop-types';

export const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [auth, setAuth] = useState(null);

  const GlobalState = {
    authState: { auth, setAuth },
  };

  return (
    <GlobalContext.Provider value={GlobalState}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;

GlobalProvider.propTypes = {
  children: Proptypes.element.isRequired,
};
