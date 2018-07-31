import React from 'react';
import State from './State';
import { renderProps } from './utils';

const Counter = ({ count, initial = 0, onChange, ...props }) => (
  <State count={count} initial={{ count: initial }} onChange={onChange}>
    {({ state, setState }) =>
      renderProps(props, {
        count: state.count,
        inc: () => setState(({ count }) => ({ count: count + 1 })),
        dec: () => setState(({ count }) => ({ count: count - 1 })),
        incBy: value => setState(({ count }) => ({ count: count + value })),
        decBy: value => setState(({ count }) => ({ count: count - value })),
      })
    }
  </State>
);

export default Counter;
