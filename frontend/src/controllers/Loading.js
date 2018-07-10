import React from 'react';

import { Auth } from 'lib/auth';
import { IsLoading } from 'lib/crud';
import { Compose, renderProps } from 'lib/react-powerplug';

function Loading(props) {
  const renderFunc = (crud, auth) => {
    const { isLoading: authIsLoading } = auth;
    const { isLoading: crudIsLoading } = crud;

    const loading = authIsLoading || crudIsLoading;
    return renderProps(props, { loading });
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose components={[<IsLoading />, <Auth />]} render={renderFunc} />
    /* eslint-enable react/jsx-key */
  );
}

export default Loading;
