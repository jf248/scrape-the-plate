import React from 'react';
import * as Mui from '@material-ui/core';

ListItemPres.defaultProps = {};

function ListItemPres(props) {
  const { children, ...rest } = props;
  return <Mui.ListItem {...rest}>{children}</Mui.ListItem>;
}

export default ListItemPres;
