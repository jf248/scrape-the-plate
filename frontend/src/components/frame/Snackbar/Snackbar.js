import React from 'react';

import SnackbarController from 'controllers/Snackbar';

import SnackbarPres from './SnackbarPres';

function Snackbar() {
  const renderFunc = ({ close, isOpen, extraProps }) => {
    return <SnackbarPres {...{ close, isOpen, ...extraProps }} />;
  };

  return <SnackbarController provider render={renderFunc} />;
}

export default Snackbar;
