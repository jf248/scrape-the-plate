import React from 'react';
import * as Mui from '@material-ui/core';

ButtonPres.defaultProps = {};

function ButtonPres(props) {
  const { children, ...rest } = props;
  return <Mui.Button {...rest}>{children}</Mui.Button>;
}

export default ButtonPres;
