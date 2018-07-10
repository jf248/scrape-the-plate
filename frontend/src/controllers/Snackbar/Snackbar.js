import React from 'react';
import { Queue } from 'lib/redux-queue';
import { renderProps } from 'lib/react-powerplug';

import { NAME } from './names';

export default props => {
  const { provider } = props;
  return (
    <Queue
      provider={provider}
      name={NAME}
      render={({ push, pop, hasItems: isOpen, queue }) => {
        const open = () => {
          push();
        };
        const close = () => {
          pop();
        };
        const extraProps = queue[0];
        return renderProps(props, { open, close, isOpen, extraProps });
      }}
    />
  );
};
