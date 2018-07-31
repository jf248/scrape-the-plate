import React from 'react';

import { Snackbar as SnackbarController } from 'controllers/snackbar';

import SnackbarPres from './SnackbarPres';

function Snackbar() {
  const renderFunc = ({ onClose, isOpen, extraProps }) => {
    return <SnackbarPres {...{ onClose, isOpen, ...extraProps }} />;
  };

  return <SnackbarController provider render={renderFunc} />;
}

export default Snackbar;
