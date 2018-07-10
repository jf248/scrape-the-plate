import React from 'react';

import { State, renderProps, callAll } from 'lib/react-powerplug';
import { object } from 'lib/immutably';

function Modals(props) {
  const renderFunc = ({ state: { modals }, setState }) => {
    const openModal = (name, props = {}) => {
      setState(prevState => ({
        modals: {
          ...prevState.modals,
          [name]: props,
        },
      }));
    };
    const closeModal = name => {
      setState(prevState => ({
        modals: object.remove(prevState.modals, name),
      }));
    };
    const getModalProps = (ownProps = {}) => {
      const name = ownProps.name;
      const modal = modals ? modals[name] : null;

      return {
        ...ownProps,
        open: !!modal,
        onClose: callAll(ownProps.onClose, () => closeModal(name)),
        ...modal,
      };
    };
    return renderProps(props, {
      getModalProps,
      openModal,
      closeModal,
    });
  };
  return <State initial={{ modals: props.initial }} render={renderFunc} />;
}

export default Modals;
