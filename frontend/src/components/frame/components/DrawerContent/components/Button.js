import React from 'react';
import PropTypes from 'prop-types';

import * as PowerPlug from 'lib/react-powerplug';
import { RoutePush } from 'controllers/route-push';

import ButtonPres from './ButtonPres';

Button.propTypes = {
  to: PropTypes.string.isRequired,
};

function Button(props) {
  const { to, ...rest } = props;

  const renderFunc = ({ push }) => {
    const onClick = () => push(to);
    return <ButtonPres {...{ onClick, ...rest }} />;
  };

  return (
    /* eslint-disable react/jsx-key */
    <PowerPlug.Compose components={[<RoutePush />]} render={renderFunc} />
    /* eslint-enable react/jsx-key */
  );
}

export default Button;
