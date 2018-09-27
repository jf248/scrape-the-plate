import React from 'react';
import PropTypes from 'prop-types';

import { Compose } from 'lib/react-powerplug';
import * as Crud from 'lib/crud';

import TagPres from './TagPres';

Tag.defaultProps = {
  resource: 'tags',
};

Tag.propTypes = {
  id: PropTypes.any.isRequired,
};

function Tag({ id, resource }) {
  const renderFunc = crud => {
    const { record: { name } = {} } = crud;
    return <TagPres {...{ name }} />;
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[<Crud.Record {...{ resource, id }} />]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default Tag;
