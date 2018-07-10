import React from 'react';

import { State, renderProps, callAll } from 'lib/react-powerplug';
import { array } from 'lib/immutably';

ListField.defaultProps = {};

function ListField(props) {
  const { defaultValue, value, onChange, blankItem } = props;

  const renderFunc = ({ state: { value }, setState }) => {
    const handleRemove = index => () => {
      setState(prevState => ({
        value: array.remove(prevState.value, index),
      }));
    };

    const handleChange = index => item => {
      setState(prevState => ({
        value: array.replace(prevState.value, index, item),
      }));
    };

    const push = item => {
      setState(prevState => ({
        value: array.push(prevState.value, item),
      }));
    };

    const getItems = () => {
      if (blankItem === undefined) {
        return value || [];
      } else {
        return [...(value || []), blankItem];
      }
    };

    const getItemProps = ({ index, item, onChange, onRemove, ...rest }) => {
      const items = getItems();
      return {
        blankItem,
        key: index,
        index,
        item,
        onChange: callAll(onChange, handleChange(index)),
        onRemove: callAll(onRemove, handleRemove(index)),
        last: index + 1 === items.length,
        orphan: items.length === 1,
        ...rest,
      };
    };

    return renderProps(props, {
      items: getItems(),
      getItemProps,
      push,
    });
  };

  return (
    <State
      enableReinitialize
      initial={{ value: defaultValue }}
      value={value}
      render={renderFunc}
      onChange={changes => {
        changes.value && onChange(changes.value);
      }}
    />
  );
}

export default ListField;