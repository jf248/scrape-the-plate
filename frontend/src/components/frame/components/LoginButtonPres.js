import React from 'react';
import { Button } from '@material-ui/core';

function LoginButton(props) {
  const { isLoggedIn, onClick } = props;
  return (
    <Button color={'inherit'} onClick={onClick}>
      {isLoggedIn ? 'Log out' : 'Log in / Sign up'}
    </Button>
  );
}

export default LoginButton;
