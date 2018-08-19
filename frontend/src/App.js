import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import { store, history } from './store';
import { routes } from 'config';
import { Route as ColdRoute } from 'components/frame';

const Route = hot(module)(ColdRoute);

function App() {
  return (
    <ReduxProvider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          {routes.map(route => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </ConnectedRouter>
    </ReduxProvider>
  );
}

export default App;
