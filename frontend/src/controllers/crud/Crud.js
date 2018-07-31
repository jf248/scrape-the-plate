import React from 'react';

import { renderProps } from 'lib/react-powerplug';
import { destroy } from 'lib/crud';
import { WithStore } from 'lib/with-store';

import { CRUD_CONTROLLER } from './names';

Crud.defaultProps = {
  authorize: true,
};

function Crud(props) {
  const { resource, authorize, meta: metaProp } = props;

  const meta = {
    authorize,
    key: CRUD_CONTROLLER,
    onSuccess: {
      snackbar: {},
    },
    onFailure: {
      snackbar: {},
    },
    ...metaProp,
  };

  const renderFunc = recordProps => {
    const { destroy: destroyProp } = recordProps;
    const destroy = ({ id, previousData }, extraMeta) =>
      destroyProp({ id, previousData }, { ...meta, ...extraMeta });
    return renderProps(props, {
      destroy,
    });
  };

  return (
    <WithStore
      actionCreators={{
        destroy: destroy(resource),
      }}
      render={renderFunc}
    />
  );
}

export default Crud;
