import React from 'react';
import PropTypes from 'prop-types';

import { Compose } from 'lib/react-powerplug';
import * as Crud from 'lib/crud';

import { RoutePush } from 'controllers/route-push';
import ListItemPres from './ListItemPres';

ListItem.defaultProps = {
  recipe: {},
};

ListItem.propTypes = {
  id: PropTypes.any.isRequired,
};

function ListItem(props) {
  const { id, ...rest } = props;

  const renderFunc = ({ push }, { record }) => {
    const onClick = () => push(`/recipes/${id}/`);
    return <ListItemPres {...{ record, onClick, ...rest }} />;
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <RoutePush />,
        <Crud.Record {...{ resource: 'recipes', lazy: true, id }} />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default ListItem;
