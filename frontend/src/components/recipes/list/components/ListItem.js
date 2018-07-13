import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { Record } from 'lib/crud'

import RoutePush from 'controllers/RoutePush'
import ListItemPres from './ListItemPres';

ListItem.defaultProps = {
  item: {},
};

function ListItem(props) {
  const { item: itemProp } = props;

  const { source: sourceId } = itemProp;

  const renderFunc = ({ push }, {record: sourceRecord}) => {

    // Make a copy of item and mutate the copy
  const item = { ...itemProp };

    item.source = sourceRecord;

    return (
      <ListItemPres {...{ item, push }} />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
  <Compose
    components={[
      <RoutePush/>,
      <Record resource={'sources'} id={sourceId}/>
    ]}
    render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default ListItem;
