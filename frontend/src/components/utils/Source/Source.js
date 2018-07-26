import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { Record } from 'lib/crud';
import { Auth } from 'lib/auth';

import SourcePres from './SourcePres';

Source.defaultProps = {
  recipe: {},
};

function Source(props) {
  const { recipe, ...rest } = props;

  const renderFunc = (auth, book, user, source) => {
    const { user: { id: currentUserId } = {} } = auth;
    const isOwner = currentUserId && recipe.user === currentUserId;
    const fullRecipe = { ...recipe };
    book && (fullRecipe.book = book.record);
    user && (fullRecipe.user = user.record);
    source && (fullRecipe.source = source.record);
    return <SourcePres {...{ recipe: fullRecipe, isOwner, ...rest }} />;
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <Auth />,
        <Record resource="books" id={recipe.book} />,
        <Record resource="users" id={recipe.user} />,
        <Record resource="sources" id={recipe.source} />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default Source;
