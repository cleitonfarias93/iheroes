import { useContext } from 'react';

// Context
import { GlobalContext } from 'contexts/GlobalContext/GlobalContext';

// Constants
import { IHEROES_AUTH } from 'constants/LocalStorageKeysConstants';

export default function useAuth() {
  const context = useContext(GlobalContext);
  const { authState } = context;
  const { setAuth: setAuthState } = authState;

  function setAuth(data) {
    localStorage.setItem(IHEROES_AUTH, JSON.stringify(data));
    setAuthState(data);
  }

  function getAuth() {
    if (authState?.token) {
      return authState;
    }

    if (JSON.parse(localStorage.getItem(IHEROES_AUTH))?.token) {
      return JSON.parse(localStorage.getItem(IHEROES_AUTH));
    }

    return null;
  }

  function logout() {
    setAuth(null);
    localStorage.removeItem(IHEROES_AUTH);
  }

  if (!authState) {
    throw new Error('useAuth must be used within a GlobalProvider');
  }

  return {
    setAuth,
    getAuth,
    logout,
  };
}
