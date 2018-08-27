import React from 'react';

import * as PowerPlug from 'lib/react-powerplug';

ModalController.defaultProps = {
  initial: false,
};

function ModalController(props) {
  const { initial } = props;
  const renderFunc = ({ state, setState }) => {
    const onOpenWithProps = (props = {}) => {
      setState({ open: true, props });
    };

    const onOpen = () => {
      onOpenWithProps();
    };

    const onClose = () => {
      setState({ open: false, props: {} });
    };

    const getModalProps = (ownProps = {}) => ({
      ...ownProps,
      ...state.props,
      open: state.open,
      onClose: PowerPlug.callAll(ownProps.onClose, onClose),
    });

    return PowerPlug.renderProps(props, {
      getModalProps,
      onOpen,
      onOpenWithProps,
      onClose,
    });
  };

  return (
    <PowerPlug.State
      initial={{ open: initial, props: {} }}
      render={renderFunc}
    />
  );
}

export default ModalController;
