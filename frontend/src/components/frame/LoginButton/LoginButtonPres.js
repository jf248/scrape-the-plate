import React from 'react';
import { Button } from '@material-ui/core';

function LoginButton(props) {
  const { isLoggedIn, openModal, logout } = props;
  return (
    <Button color={'inherit'} onClick={isLoggedIn ? logout : openModal}>
      {isLoggedIn ? 'Log out' : 'Log in / Sign up'}
    </Button>
  );
}

export default LoginButton;
