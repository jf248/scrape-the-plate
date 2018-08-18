import React from 'react';
import PreparationStep from './PreparationStep';
import { ListField } from 'lib/react-listfield';

function PreparationField(props) {
  const { value, onChange, onBlur } = props;

  /* eslint-disable react/jsx-key */
  const renderFunc = ({ items, getItemProps }) => {
    return items.map((item, index) => (
      <PreparationStep {...getItemProps({ item, index })} />
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
