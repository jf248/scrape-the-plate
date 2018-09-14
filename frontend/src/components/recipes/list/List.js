import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { RecordsMany } from 'lib/crud';
import { Auth } from 'lib/auth';

import ListPres from './ListPres';

function List(props) {
  const { variant, searchQuery, tagId } = props;

  const getInitialParams = userId => {
    switch (variant) {
      case 'search':
        return {
          filter: { search: searchQuery },
        };
      case 'mine':
        return {
          filter: { user: userId },
        };
      case 'tags':
        return {
          filter: { tags: tagId },
        };
      case 'all':
      default:
        return { filter: {} };
    }
  };

  const renderFunc = (auth, recordsMany) => {
    const { ids, data, total, params = {}, goFetch } = recordsMany;
    const { filter, page } = params;

    const setPage = page => goFetch({ page });

    return (
      <ListPres
        {...{
          data,
          ids,
          page,
          filter,
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
        <Auth />,
        (render, { isLoggedIn, user: { id: userId } = {} }) => (
          <RecordsMany
            resource={'recipes'}
            initialParams={getInitialParams(userId)}
            key={isLoggedIn}
            render={render}
          />
        ),
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default List;
