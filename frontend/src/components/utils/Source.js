import React from 'react';

import { Link } from 'lib/mui-components';

function Source({
  source,
  url,
  book,
  page,
  user,
  isOwner,
  includePage = false,
}) {
  return (
    <React.Fragment>
      {!isOwner &&
        user && (
          <span>{`${user.first_name} ${user.last_name.slice(0, 1)}`}</span>
        )}
      {source && (
        <React.Fragment>
          {!isOwner && ' via '}
          <Link
            target={'_blank'}
            onClick={event => event.stopPropagation()}
            href={url}
          >
            {source.name}
          </Link>
        </React.Fragment>
      )}
      {book && (
        <React.Fragment>
          {!isOwner && ' via '}
          <span>{`${book.title}${page && includePage && `, p. ${page}`}`}</span>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Source;
