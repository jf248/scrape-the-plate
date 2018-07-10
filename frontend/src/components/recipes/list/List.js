import React from 'react';

import { RecordsMany } from 'lib/crud';

import ListPres from './ListPres';

function List() {
  const renderFunc = ({ ids, data, total, params, goFetch }) => {
    const setPage = page => goFetch({ page });
    const setFilter = filter => goFetch({ filter });
    return <ListPres {...{ setPage, setFilter, ids, data, total, params }} />;
  };

  return <RecordsMany resource={'recipes'} render={renderFunc} />;
}

export default List;
