import React from 'react';

import * as PowerPlug from 'lib/react-powerplug';

import ComboboxWithFilterController from 'lib/mui-components/ComboboxWithFilterController'; // eslint-disable-line import/no-internal-modules
import ComboboxDialogPres from './ComboboxDialogPres';

class ComboboxDialog extends React.Component {
  static defaultProps = {
    multiple: false,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.open || nextProps.open !== this.props.open;
  }

  render() {
    const {
      InputProps,
      inputProps,
      itemToGroup,
      listBottomElement,
      onClose,
      open,
      submenuItems,
      suggestion,
      title,
      ...rest
    } = this.props;

    const renderFunc = (stateProps, combobox) => {
      const {
        state: { clickedIndex },
        setState,
      } = stateProps;
      return (
        <ComboboxDialogPres
          {...combobox.downshift.getRootProps({
            InputProps,
            clickedIndex,
            inputProps,
            itemToGroup,
            listBottomElement,
            onClose,
            onMoreClick: clickedIndex => () => setState({ clickedIndex }),
            open,
            refKey: 'downshiftRef',
            submenuItems,
            suggestion,
            title,
            ...combobox,
          })}
        />
      );
    };

    return (
      /* eslint-disable react/jsx-key */
      <PowerPlug.Compose
        components={[
          <PowerPlug.State />,
          <ComboboxWithFilterController
            {...{
              isOpen: true,
              ...rest,
            }}
          />,
        ]}
        render={renderFunc}
      />
      /* eslint-enable react/jsx-key */
    );
  }
}

export default ComboboxDialog;
