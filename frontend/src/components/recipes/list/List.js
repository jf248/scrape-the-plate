import React from 'react';

import { Compose, renderProps } from 'lib/react-powerplug';
import { RecordsMany } from 'lib/crud';
import { Auth } from 'lib/auth';

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
  const renderFunc = (auth, recordsMany) => {
    const { user: { id: userId } = {} } = auth;
    const { ids, data, total, params = {}, goFetch } = recordsMany;
    const { filter, page } = params;
    const setPage = page => goFetch({ ...params, page });
    const setFilter = filter => goFetch({ ...params, filter });
    const onlyUser = !!filter.user;
    const onOnlyUserToggle = () => {
      let newParams;
      const { user, ...newFilter } = filter;
      if (user) {
        newParams = { ...params, filter: newFilter };
      } else {
        newParams = { ...params, filter: { ...newFilter, user: userId } };
      }
      goFetch(newParams);
    };
    return (
      <ListPres
        {...{
          data,
          ids,
          page,
          filter,
          setFilter,
          setPage,
          total,
          onlyUser,
          onOnlyUserToggle,
        }}
      />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <Auth />,
        <RecordsMany resource={'recipes'} />,
        (render, { isLoggedIn }, { goFetch }) => (
          <Updater {...{ goFetch, isLoggedIn, render }} />
        ),
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default List;
