import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { RecordsMany } from 'lib/crud';
import { Auth } from 'lib/auth';

import { RoutePush } from 'controllers/route-push';
import ListPres from './ListPres';

function List(props) {
  const { variant, searchQuery, tagId } = props;

  const getInitialParams = userId => {
    let params = { page: 1, perPage: 12 };
    switch (variant) {
      case 'search':
        params.filter = { search: searchQuery };
        break;
      case 'mine':
        params.filter = { user: userId };
        break;
      case 'tags':
        params.filter = { tags: tagId };
        break;
      case 'all':
      default:
        break;
    }
    return params;
  };

  const renderFunc = (auth, recordsMany, routePush) => {
    const { ids, total, params = {}, goFetch } = recordsMany;
    const { push } = routePush;
    const { filter, page, perPage } = params;

    const setPage = page => goFetch({ page });

    return (
      <ListPres
        {...{
          ids,
          page,
          filter,
          setPage,
          total,
          push,
          perPage,
        }}
      />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <Auth />,
        (render, { isLoggedIn, user: { id: userId } = {} }) => (
          <RecordsMany
            resource={'recipes'}
            initialParams={getInitialParams(userId)}
            key={isLoggedIn}
            render={render}
          />
        ),
        <RoutePush />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default List;
