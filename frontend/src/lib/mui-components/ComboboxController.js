import React from 'react';
import Downshift from 'downshift';

import { Compose, State, renderProps } from 'lib/react-powerplug';

import { wrapInArray } from 'lib/mui-components/utils'; // eslint-disable-line import/no-internal-modules

ComboboxController.defaultProps = {
  defaultInputValue: '',
  defaultSelectedItems: [],
  comparator: (x, y) => x === y,
  itemToGroup: item => item['group'],
  items: [],
  itemToString: function(item) {
    return item === null ? '' : item;
  },
  MenuProps: {},
  multiple: false,
  width: 256,
  menuBottomFixed: true,
  TextFieldProps: {},
};

function ComboboxController({
  children,
  comparator: comparatorProp,
  defaultSelectedItems,
  items,
  multiple,
  render,
  selectedItems: selectedItemsProp,

  // downshit props:
  isOpen: isControlledOpen,
  itemToString,
  onChange,
  //onSelect,
  onInputValueChange: onInputValueChangeProp,
  ...rest
}) {
  const handleChange = changes => {
    // We only want to expose changes to selectedItems, not the full state object
    // { selectedItems, focusIndex }.
    const unWrap = items => (multiple ? items : items[0] || null);

    if (changes.hasOwnProperty('selectedItems')) {
      const { selectedItems } = changes;
      onChange && onChange(unWrap(selectedItems));
      //onSelect && onSelect(unWrap(selectedItems));
    }

    if (changes.hasOwnProperty('inputValue')) {
      const { inputValue } = changes;
      onInputValueChangeProp && onInputValueChangeProp(inputValue);
    }
  };

  const comparator = (x, y) => {
    if (x && y) {
      return comparatorProp(x, y);
    }
    return false;
  };

  const getSuggestedItem = inputValue => {
    if (!inputValue) {
      return undefined;
    }
    return items.find(item => itemToString(item).startsWith(inputValue));
  };

  const stateReducer = (state, changes) => {
    const types = Downshift.stateChangeTypes;
    switch (changes.type) {
      case types.keyDownEnter:
      case types.clickItem:
        if (multiple) {
          return {
            ...changes,
            highlightedIndex: state.highlightedIndex,
            isOpen: true,
          };
        }
        return changes;
      default:
        return changes;
    }
  };

  const handleSelection = setState => newItem => {
    if (!newItem) {
      setState({ selectedItems: [], inputValue: '' });
    }

    if (newItem) {
      setState(({ selectedItems }) => {
        const newSelectedItems = selectedItems.some(item =>
          comparator(item, newItem)
        )
          ? selectedItems.filter(item => !comparator(item, newItem))
          : multiple
            ? [...selectedItems, newItem]
            : [newItem];

        return {
          focusIndex: null,
          selectedItems: newSelectedItems,
          inputValue: multiple
            ? ''
            : newSelectedItems[0]
              ? itemToString(newSelectedItems[0])
              : '',
        };
      });
    }
  };

  const renderFunc = ({ state, setState }, downshift) => {
    const { selectedItems, focusIndex, inputValue } = state;
    const { selectItem } = downshift;

    const onInputValueChange = inputValue => {
      setState({ inputValue });
    };

    const suggestedItem = getSuggestedItem(inputValue);
    const suggestion = suggestedItem ? itemToString(suggestedItem) : '';

    const last = selectedItems.length - 1;

    const handleKeyDown = event => {
      if (!event.key) {
        return;
      }

      if (suggestedItem && ['Enter', 'Tab'].includes(event.key)) {
        selectItem(suggestedItem);
      }

      if (!inputValue) {
        const left = index => {
          return index === null ? last : index === 0 ? 0 : index - 1;
        };
        const right = index => {
          return index === null || index === last ? null : index + 1;
        };
        const move = func =>
          setState(({ focusIndex }) => ({
            focusIndex: func(focusIndex),
          }));

        switch (event.key) {
          case 'ArrowLeft':
            move(left);
            break;
          case 'ArrowRight':
            move(right);
            break;
          case 'Delete':
          case 'Backspace': {
            const index = focusIndex === null ? last : focusIndex;
            multiple && selectItem(selectedItems[index]);
            break;
          }
          default:
            break;
        }
      }
    };

    return renderProps(
      { children, render },
      {
        selectedItems,
        multiple,
        onKeyDown: handleKeyDown,
        focusIndex,
        isControlledOpen,
        downshift,
        comparator,
        suggestion,
        items,
        onInputValueChange,
        inputValue,
      }
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <State
          initial={{
            selectedItems:
              defaultSelectedItems && wrapInArray(defaultSelectedItems),
            focusIndex: null,
            inputValue: '',
          }}
          key="state"
          selectedItems={
            selectedItemsProp === undefined
              ? undefined
              : wrapInArray(selectedItemsProp)
          }
          inputValue={
            !multiple && selectedItemsProp
              ? itemToString(selectedItemsProp)
              : undefined
          }
          onChange={handleChange}
        />,
        (render, { state: { inputValue }, setState }) => (
          <Downshift
            {...rest}
            onInputValueChange={undefined}
            isOpen={isControlledOpen}
            itemToString={itemToString}
            onSelect={handleSelection(setState)}
            stateReducer={stateReducer}
            inputValue={inputValue}
          >
            {render}
          </Downshift>
        ),
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default ComboboxController;
