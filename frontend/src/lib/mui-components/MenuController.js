import React from 'react';

import { State, renderProps } from 'lib/react-powerplug';

function MenuController(props) {
  const renderFunc = ({ state, setState }) => {
    const open = Boolean(state.anchorEl);
    const onClose = () => setState({ anchorEl: null });
    const anchorEl = state.anchorEl;
    const onClick = event => setState({ anchorEl: event.currentTarget });

    return renderProps(props, { onClick, onClose, anchorEl, open });
  };

  return <State initial={{ anchorEl: null }} render={renderFunc} />;
}

export default MenuController;
