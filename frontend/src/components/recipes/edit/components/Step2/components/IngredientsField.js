import React from 'react';
import Ingredient from './Ingredient';
import ListField from 'lib/react-listfield';

function IngredientsField(props) {
  const { value, onChange } = props;

  const renderFunc = ({ items, getItemProps }) => {
    /* eslint-disable react/jsx-key */
    return items.map((item, index) => (
      <Ingredient
        {...getItemProps({
          item,
          index,
        })}
      />
    ));
  };
  /* eslint-enable react/jsx-key */

  return (
    <ListField
      value={value}
      blankItem={{ text: '' }}
      onChange={onChange}
      render={renderFunc}
    />
  );
}

export default IngredientsField;
