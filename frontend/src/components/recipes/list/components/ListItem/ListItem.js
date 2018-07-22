import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { Record } from 'lib/crud';

import ListItemPres from './ListItemPres';

ListItem.defaultProps = {
  item: {},
};

function ListItem(props) {
  const { item: itemProp, push } = props;

  const { source: sourceId } = itemProp;

  const renderFunc = ({ record: sourceRecord }) => {
    // Make a copy of item and mutate the copy
    const item = { ...itemProp };

    item.source = sourceRecord;

    const onClick = () => push(`/recipes/${item.id}`);
    return <ListItemPres {...{ item, onClick }} />;
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[<Record resource={'sources'} id={sourceId} />]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default ListItem;
