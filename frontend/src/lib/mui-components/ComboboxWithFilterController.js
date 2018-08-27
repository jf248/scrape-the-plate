import React from 'react';
import * as PowerPlug from 'lib/react-powerplug';

import ComboboxController from './ComboboxController';

/**
 * Must supply either `items` or `refine` prop.
 */
function ComboboxWithFilterController({
  refineFunc: refineFuncProp,
  items,
  itemToString,
  defaultInputValue,
  ...rest
}) {
  const defaultRefineFunc = (query = '') => {
    return items.filter(item =>
      itemToString(item)
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  };

  const refineFunc = refineFuncProp || defaultRefineFunc;

  return (
    <PowerPlug.Filter
      {...{ defaultQuery: defaultInputValue, refineFunc }}
      render={({ hits: items, refine }) => (
        <ComboboxController
          {...{
            onInputValueChange: refine,
            items,
            itemToString,
            defaultInputValue,
            ...rest,
          }}
        />
      )}
    />
  );
}

export default ComboboxWithFilterController;
