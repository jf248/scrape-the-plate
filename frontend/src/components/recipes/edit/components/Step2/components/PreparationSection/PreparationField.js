import React from 'react';
import PreparationStep from './PreparationStep';
import { ListField } from 'lib/react-listfield';

function PreparationField(props) {
  const { error, value, onChange, onBlur } = props;

  const getError = index => (Array.isArray(error) ? error[index] : undefined);

  /* eslint-disable react/jsx-key */
  const renderFunc = ({ items, getItemProps }) => {
    return items.map((item, index) => (
      <PreparationStep
        {...getItemProps({ item, index, error: getError(index) })}
      />
    ));
  };
  /* eslint-enable react/jsx-key */

  return (
    <ListField
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      blankItem={''}
      render={renderFunc}
    />
  );
}

export default PreparationField;
