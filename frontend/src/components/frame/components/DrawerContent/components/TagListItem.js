import React from 'react';
import PropTypes from 'prop-types';

import * as PowerPlug from 'lib/react-powerplug';
import * as Crud from 'lib/crud';

import { RoutePush } from 'controllers/route-push';
import TagListItemPres from './TagListItemPres';

TagListItem.defaultProps = {
  resource: 'tags',
  lazy: true,
};

TagListItem.propTypes = {
  id: PropTypes.any.isRequired,
};

function TagListItem(props) {
  const { resource, lazy, id, ...rest } = props;

  const renderFunc = ({ record }, { push, path }) => {
    const selected = path === `/tags/${id}`;
    const onClick = () => push(`/tags/${id}`);
    return <TagListItemPres {...{ record, selected, onClick, ...rest }} />;
  };

  return (
    /* eslint-disable react/jsx-key */
    <PowerPlug.Compose
      components={[<Crud.Record {...{ resource, lazy, id }} />, <RoutePush />]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default TagListItem;
