import React from 'react';

import { renderProps } from 'lib/react-powerplug';
import { Record } from 'lib/crud';

import { RECORD_DESTROY } from './names';

RecordDestroy.defaultProps = {
  authorize: true,
};

function RecordDestroy(props) {
  const { resource, id, authorize, meta } = props;

  const renderFunc = recordProps => {
    const { record, destroy } = recordProps;
    return renderProps(props, {
      record,
      destroy,
    });
  };

  return (
    <Record
      {...{
        lazy: true,
        resource,
        id,
        authorize,
        meta: { key: RECORD_DESTROY, ...meta },
      }}
      render={renderFunc}
    />
  );
}

export default RecordDestroy;
