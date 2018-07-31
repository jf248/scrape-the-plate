import React from 'react';

import { Compose } from 'lib/react-powerplug';

import { RoutePush } from 'controllers/route-push';
import ListItemPres from './ListItemPres';

ListItem.defaultProps = {
  recipe: {},
};

function ListItem(props) {
  const { recipe } = props;
  const { id } = recipe;

  const renderFunc = ({ push }) => {
    const onClick = () => push(`/recipes/${id}/`);
    return <ListItemPres {...{ onClick, ...props }} />;
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose components={[<RoutePush />]} render={renderFunc} />
    /* eslint-enable react/jsx-key */
  );
}

export default ListItem;
