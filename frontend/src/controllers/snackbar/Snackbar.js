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
        const onOpen = (payload = {}) => {
          push(payload);
        };
        const onClose = () => {
          pop();
        };
        const extraProps = queue[0];
        return renderProps(props, { onOpen, onClose, isOpen, extraProps });
      }}
    />
  );
};
