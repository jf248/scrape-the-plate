import React from 'react';

import { Link } from 'lib/mui-components';

SourcePres.defaultProps = {
  includePage: false,
  recipe: {},
};

function SourcePres(props) {
  const { recipe, isOwner, includePage } = props;
  const { source, url, book, page, user } = recipe;

  return (
    <React.Fragment>
      {!isOwner && user && `${user.first_name} ${user.last_name.slice(0, 1)}`}
      {isOwner && !source && !book && !url && 'My own'}
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
          {`${book.title}${page && includePage ? `, p. ${page}` : ''}`}
        </React.Fragment>
      )}
      {!source &&
        url && (
          <React.Fragment>
            {!isOwner && ' via '}
            <Link
              target={'_blank'}
              onClick={event => event.stopPropagation()}
              href={url}
            >
              {url}
            </Link>
          </React.Fragment>
        )}
    </React.Fragment>
  );
}

export default SourcePres;
