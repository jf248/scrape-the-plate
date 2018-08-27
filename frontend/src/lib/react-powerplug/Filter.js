import React from 'react';
import State from './State';
import { renderProps } from './utils';

const Filter = ({ defaultQuery = '', refineFunc, onChange, ...props }) => (
  <State
    initial={{
      query: defaultQuery,
    }}
    onChange={onChange}
  >
    {({ state, setState }) =>
      renderProps(props, {
        query: state.query,
        refine: query => setState({ query }),
        hits: refineFunc(state.query),
      })
    }
  </State>
);

export default Filter;
