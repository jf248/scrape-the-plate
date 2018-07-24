import React from 'react';

import { Compose, renderProps } from 'lib/react-powerplug';
import { RecordsMany } from 'lib/crud';
import { Auth } from 'lib/auth';

import RoutePush from 'controllers/RoutePush';
import ListPres from './ListPres';

// This is an ugly hack to force a goFetch call to referesh the
// RecordsMany component when user logs in.
class Updater extends React.Component {
  componentDidUpdate(prevProps) {
    const { isLoggedIn, goFetch } = this.props;
    if (isLoggedIn !== prevProps.isLoggedIn) {
      goFetch();
    }
  }
  render() {
    return renderProps(this.props, {});
  }
}

function List() {
  const renderFunc = ({ push }, recordsMany, auth) => {
    const { ids, data, total, params, goFetch } = recordsMany;
    const { user: { id: loggedInUserId } = {} } = auth;
    const setPage = page => goFetch({ page });
    const setFilter = filter => goFetch({ filter });
    return (
      <ListPres
        {...{
          push,
          setPage,
          setFilter,
          ids,
          data,
          total,
          params,
          loggedInUserId,
        }}
      />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <RoutePush />,
        <RecordsMany resource={'recipes'} />,
        <Auth />,
        (render, { goFetch }, { isLoggedIn }) => (
          <Updater {...{ goFetch, isLoggedIn, render }} />
        ),
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default List;
