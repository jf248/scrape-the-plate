import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { Record } from 'lib/crud';

import ListItemPres from './ListItemPres';

ListItem.defaultProps = {
  item: {},
};

function ListItem(props) {
  const { item: itemProp, push, loggedInUserId } = props;

  const { source: sourceId, book: bookId, user: userId } = itemProp;

  const renderFunc = (
    { record: sourceRecord },
    { record: bookRecord },
    { record: userRecord }
  ) => {
    // Make a copy of item and mutate the copy
    const item = { ...itemProp };

    item.source = sourceRecord;
    item.book = bookRecord;
    item.user = userRecord;

    const isOwner =
      loggedInUserId && userRecord && loggedInUserId === userRecord.id
        ? true
        : false;

    const onClick = () => push(`/recipes/${item.id}`);
    return <ListItemPres {...{ item, onClick, isOwner }} />;
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <Record resource={'sources'} id={sourceId} />,
        <Record resource={'books'} id={bookId} />,
        <Record resource={'users'} id={userId} />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default ListItem;
