import React from 'react';
import State from './State';
import { renderProps } from './utils';

const Toggle = ({ on, initial = false, onChange, ...props }) => (
  <State on={on} initial={{ on: initial }} onChange={onChange}>
    {({ state, setState }) =>
      renderProps(props, {
        on: state.on,
        toggle: () => setState(({ on }) => ({ on: !on })),
        switchOn: () => setState({ on: true }),
        switchOff: () => setState({ on: false }),
      })
    }
  </State>
);

export default Toggle;
