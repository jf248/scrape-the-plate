import React from 'react';

import SnackbarController from 'controllers/Snackbar';

import SnackbarPres from './SnackbarPres';

function Snackbar() {
  const renderFunc = ({ onClose, isOpen, extraProps }) => {
    return <SnackbarPres {...{ onClose, isOpen, ...extraProps }} />;
  };

  return <SnackbarController provider render={renderFunc} />;
}

export default Snackbar;
