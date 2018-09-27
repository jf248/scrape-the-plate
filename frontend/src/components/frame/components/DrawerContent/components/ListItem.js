import React from 'react';
import PropTypes from 'prop-types';

import * as PowerPlug from 'lib/react-powerplug';
import { RoutePush } from 'controllers/route-push';

import ListItemPres from './ListItemPres';

ListItem.propTypes = {
  to: PropTypes.string.isRequired,
};

function ListItem(props) {
  const { to, ...rest } = props;

  const renderFunc = ({ push, path }) => {
    const onClick = () => push(to);
    const selected = path === to;
    return <ListItemPres {...{ selected, onClick, ...rest }} />;
  };

  return (
    /* eslint-disable react/jsx-key */
    <PowerPlug.Compose components={[<RoutePush />]} render={renderFunc} />
    /* eslint-enable react/jsx-key */
  );
}

export default ListItem;
