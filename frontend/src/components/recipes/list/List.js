import React from 'react';

import { Compose, renderProps } from 'lib/react-powerplug';
import { RecordsMany } from 'lib/crud';

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
  const renderFunc = ({ push }, recordsMany) => {
    const { ids, data, total, params, goFetch } = recordsMany;
    const setPage = page => goFetch({ page });
    const setFilter = filter => goFetch({ filter });
    const onAddClick = () => push('/recipes/create');
    return (
      <ListPres
        {...{
          data,
          ids,
          onAddClick,
          params,
          setFilter,
          setPage,
          total,
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
