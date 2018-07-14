import React from 'react';
import Downshift from 'downshift';

import { Compose, State, renderProps } from 'lib/react-powerplug';

import {
  callAll,
  makeGroupReducer,
  makeFirstIndexReducer,
  wrapInArray,
} from '../utils';

ComboboxController.defaultProps = {
  defaultInputValue: '',
  groupField: 'group',
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

function ComboboxController(props) {
  const {
    defaultInputValue,
    defaultSelectedItem,
    filterFunc,
    groupField,
    items,
    itemToString,
    multiple,
    onChange,
    onSelect,
    selectedItem,
    isOpen: isControlledOpen,
    ...rest
  } = props;

  const defaultFilterFunc = (items = [], query = '') =>
    items.filter(item =>
      itemToString(item)
        .toLowerCase()
        .includes(query.toLowerCase())
    );

  const deleteSelectedItem = arg => {
    const {
      downshiftProps: { selectItem },
      inputValue,
      selectedItemFocusIndex: index,
      selectedItem,
    } = arg;
    if (!inputValue && index !== null) {
      selectItem(wrapInArray(selectedItem)[index]);
    }
  };

  const getFilteredItems = (items = [], query = '', selectedItem) => {
    selectedItem = wrapInArray(selectedItem);
    items = filterFunc
      ? filterFunc(items, query)
      : defaultFilterFunc(items, query);
    if (isControlledOpen) {
      return items;
    }
    return items.filter(item => !selectedItem.includes(item));
  };

  const getGroupedItems = (items = []) =>
    items
      .reduce(...makeGroupReducer(groupField))
      .result.reduce(...makeFirstIndexReducer()).result;

  const getInitial = () => {
    let initialSelectedItem;
    let initialInputValue;
    if (selectedItem) {
      initialInputValue = multiple
        ? defaultInputValue
        : itemToString(selectedItem);
      initialSelectedItem = multiple ? wrapInArray(selectedItem) : selectedItem;
    } else {
      initialInputValue = defaultInputValue;
      if (defaultSelectedItem) {
        initialSelectedItem = multiple
          ? wrapInArray(defaultSelectedItem)
          : defaultSelectedItem;
      } else {
        initialSelectedItem = multiple ? [] : null;
      }
    }
    return {
      inputValue: initialInputValue,
      selectedItem: initialSelectedItem,
      selectedItemFocusIndex: null,
    };
  };

  const getItemsAndTypeAhead = ({
    highlightedIndex,
    inputValue,
    items,
    isOpen,
    selectedItem,
  }) => {
    if (isOpen) {
      items = getFilteredItems(items, inputValue, selectedItem);
      const typeAhead =
        highlightedIndex === -1 ? getTypeAhead(items, inputValue) : {};
      const groupedItems = getGroupedItems(items);
      return { groupedItems, typeAhead };
    } else {
      return { groupedItems: [], typeAhead: {} };
    }
  };

  const getTypeAhead = (items = [], inputValue = '') => {
    let text;
    let typeAheadItem;
    const found = items.some(item => {
      typeAheadItem = item;
      text = itemToString(item).toLowerCase();
      return text.startsWith(inputValue.toLowerCase());
    });
    if (found && !!inputValue) {
      return {
        typeAheadText: inputValue + text.slice(inputValue.length),
        typeAheadItem,
      };
    } else {
      return {};
    }
  };

  const handleChange = state => {
    // We only want to expose changes to selectedItem, not the full state object
    // that includes typeAhead.
    if (state.hasOwnProperty('selectedItem')) {
      const { selectedItem } = state;
      onChange && onChange(selectedItem);
    }
  };

  const handleKeyDown = props => event => {
    if (event.key && keyDownHandlers[event.key]) {
      keyDownHandlers[event.key](props);
      event.stopPropagation();
    }
  };

  const handleSelect = setState => item => {
    // The `Downshift` `selectedItem` and `inputValue` props are 'controlled'.
    // They're controlled by the `State` component. We use `State`'s `setState`
    // render prop to make changes.
    let newSelectedItem;
    let newInputValue;
    setState(({ selectedItem: currentItems }) => {
      if (multiple) {
        currentItems = wrapInArray(currentItems);
        // Find the item in currentItems, if it's there.
        // It it isn't add it. If it is, remove it.
        newSelectedItem =
          currentItems.indexOf(item) === -1
            ? [...currentItems, item]
            : currentItems.filter(x => x !== item);
        newInputValue = '';
      } else {
        // Only one selectedItem allowed. Either remove or change/add.
        newSelectedItem = currentItems === item ? null : item;
        newInputValue = itemToString(newSelectedItem);
      }
      return { selectedItem: newSelectedItem, inputValue: newInputValue };
    });
  };

  const keyDownHandlers = {
    Enter(arg) {
      const {
        downshiftProps: { selectItem },
        typeAheadItem,
      } = arg;
      if (typeAheadItem) {
        selectItem(typeAheadItem);
      }
    },
    Tab(arg) {
      const {
        downshiftProps: { selectItem },
        typeAheadItem,
      } = arg;
      if (typeAheadItem) {
        selectItem(typeAheadItem);
      }
    },
    ArrowLeft(arg) {
      const {
        selectedItem,
        selectedItemFocusIndex: index,
        inputValue,
        setState,
      } = arg;
      if (!inputValue) {
        const getNewIndex = () => {
          const last = wrapInArray(selectedItem).length - 1;
          return index === null ? last : index === 0 ? 0 : index - 1;
        };
        setState({ selectedItemFocusIndex: getNewIndex() });
      }
    },
    ArrowRight(arg) {
      const {
        selectedItem,
        selectedItemFocusIndex: index,
        inputValue,
        setState,
      } = arg;
      if (!inputValue) {
        const getNewIndex = () => {
          const last = wrapInArray(selectedItem).length - 1;
          return index === null || index === last ? null : index + 1;
        };
        setState({ selectedItemFocusIndex: getNewIndex() });
      }
    },
    Delete(arg) {
      deleteSelectedItem(arg);
    },
    Backspace(arg) {
      deleteSelectedItem(arg);
    },
  };

  const stateReducer = (selectedItem, setState) => (state, changes) => {
    const { inputValue, isOpen } = changes;

    if (isOpen === true) {
      setState({ selectedItemFocusIndex: null });
    }

    // User has closed the menu (eg by clicking outside). Tidy the inputValue.
    if (isOpen === false) {
      if (multiple) {
        setState({ inputValue: '' });
      } else {
        setState({
          inputValue: selectedItem ? itemToString(selectedItem) : '',
        });
      }
      return changes;
    }

    // User has changed the inputValue:
    // - update inputValue state, lowerCased
    // - remove highlightedIndex. We're using a typeAhead which may not
    // correspond to the first item which is otherwise highlighted by
    // Downshift
    if (inputValue !== undefined) {
      setState({
        inputValue: inputValue,
        selectedItemFocusIndex: null,
      });
      return {
        ...changes,
        highlightedIndex: -1,
      };
    }

    return changes;
  };

  const renderFunc = (stateProps, downshiftProps) => {
    const {
      state: { inputValue, selectedItem, selectedItemFocusIndex },
      setState,
    } = stateProps;
    const { highlightedIndex, isOpen } = downshiftProps;
    const itemsAndTypeAhead = getItemsAndTypeAhead({
      highlightedIndex,
      inputValue,
      items,
      isOpen,
      selectedItem,
    });
    const {
      groupedItems,
      typeAhead: { typeAheadItem, typeAheadText },
    } = itemsAndTypeAhead;

    const selectedItems = wrapInArray(selectedItem);

    const onKeyDown = handleKeyDown({
      downshiftProps,
      groupedItems,
      inputValue,
      setState,
      selectedItem,
      selectedItemFocusIndex,
      typeAheadItem,
    });

    return renderProps(props, {
      selectedItems,
      multiple,
      onKeyDown,
      typeAheadText,
      selectedItemFocusIndex,
      groupedItems,
      isControlledOpen,
      downshiftProps,
    });
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <State
          key="state"
          initial={getInitial()}
          selectedItem={selectedItem}
          onChange={handleChange}
        />,
        (render, { state: { inputValue, selectedItem }, setState }) => (
          <Downshift
            itemToString={itemToString}
            onSelect={callAll(handleSelect(setState), onSelect)}
            stateReducer={stateReducer(selectedItem, setState)}
            inputValue={inputValue}
            isOpen={isControlledOpen}
            {...rest}
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
