import React from 'react';

import { Auth } from 'lib/auth';
import { IsLoading } from 'lib/crud';
import { Compose, renderProps } from 'lib/react-powerplug';

function Loading(props) {
  const renderFunc = (crud, auth) => {
    const { isLoading: crudIsLoading } = crud;
    const { isLoggingIn: authIsLoading } = auth;

    const isLoading = authIsLoading || crudIsLoading;
    return renderProps(props, { isLoading });
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose components={[<IsLoading />, <Auth />]} render={renderFunc} />
    /* eslint-enable react/jsx-key */
  );
}

export default Loading;
