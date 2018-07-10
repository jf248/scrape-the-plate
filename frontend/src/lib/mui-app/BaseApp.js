import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Route from './Route';

const DefaultProvider = props => (
  <React.Fragment>{props.children}</React.Fragment>
);

BaseApp.defaultProps = {
  initialState: {},
  ProviderComponent: DefaultProvider,
  RouteComponent: Route,
  reduxMiddlewares: [],
  routes: [],
};

function BaseApp(props) {
  const {
    store,
    ProviderComponent,
    RouteComponent,
    routes,
    history,
    ...rest
  } = props;

  return (
    <ReduxProvider store={store}>
      <ProviderComponent>
        <ConnectedRouter history={history}>
          <Switch>
            {routes.map((route, index) => (
              <RouteComponent key={index} {...route} {...rest} />
            ))}
          </Switch>
        </ConnectedRouter>
      </ProviderComponent>
    </ReduxProvider>
  );
}

export default BaseApp;
