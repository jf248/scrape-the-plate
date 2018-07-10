import React from 'react';

import { renderProps } from 'lib/react-powerplug';
import { Queue } from 'lib/redux-queue';

function Login(props) {
  const { provider } = props;

  const renderFunc = loginModal => {
    const { pop, push, queue, hasItems: isOpen } = loginModal;
    const open = () => {
      push();
    };
    const close = () => {
      pop();
    };
    const modalProps = queue[0];
    return renderProps(props, { open, close, modalProps, isOpen });
  };

  return <Queue provider={provider} name="login" render={renderFunc} />;
}

export default Login;
