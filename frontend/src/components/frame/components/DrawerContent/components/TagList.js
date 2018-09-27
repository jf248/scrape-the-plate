import React from 'react';

import * as PowerPlug from 'lib/react-powerplug';
import * as Crud from 'lib/crud';

import TagListItem from './TagListItem';

TagList.defaultProps = {
  resource: 'tags',
  initialParams: { sort: ['name'] },
};

function TagList(props) {
  const { resource, initialParams, ...rest } = props;

  const renderFunc = crud => {
    const { ids } = crud;
    return ids.map(id => <TagListItem {...{ key: id, id, ...rest }} />);
  };

  return (
    /* eslint-disable react/jsx-key */
    <PowerPlug.Compose
      components={[<Crud.RecordsMany {...{ resource, initialParams }} />]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default TagList;
