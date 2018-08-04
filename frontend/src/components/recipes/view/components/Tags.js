import React from 'react';

import { Compose } from 'lib/react-powerplug';
import * as Crud from 'lib/crud';

import TagsPres from './TagsPres';

Tags.defaultProps = {
  tags: [],
};

function Tags({ tags }) {
  const renderFunc = records => {
    const { data = {} } = records;
    const tagNames = tags.map(id => data[id].name);
    return <TagsPres {...{ tagNames }} />;
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <Crud.RecordsMany
          {...{ resource: 'tags', params: { filter: { ids: tags } } }}
        />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default Tags;
