import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LogOutButton() {
  const { isAuthenticated, logout } = useAuth0();

  return isAuthenticated && (
    <button onClick={logout}>Logout</button>
  )
}

export default LogOutButton;