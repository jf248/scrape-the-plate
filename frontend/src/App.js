import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader';

import { store, history } from './store';
import { Switch as ColdSwitch } from 'lib/mui-app';
import { routes } from 'config';
import { Route } from 'components/frame';

const Switch = hot(module)(ColdSwitch);

function App() {
  return (
    <ReduxProvider store={store}>
      <ConnectedRouter history={history}>
        <Switch {...{ routes, RouteComponent: Route }} />
      </ConnectedRouter>
    </ReduxProvider>
  );
}

export default App;
