import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { Record } from 'lib/crud';
import { Auth } from 'lib/auth';

import Modal from 'controllers/Modal';
import RoutePush from 'controllers/RoutePush';
import Scraper from 'controllers/Scraper';
import ViewController from 'controllers/View';
import RecordDestroy from 'controllers/RecordDestroy';
import { LOGIN_MODAL } from 'names';
import ViewPres from './ViewPres';

function View(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  const renderFunc = (
    recipe,
    source,
    book,
    user,
    auth,
    loginModal,
    routePush,
    scraper,
    recordDestroy
  ) => {
    const { record: recipeRecord } = recipe;
    const { user: recipeUserId } = recipeRecord || {};
    const { user: { id: currentUserId } = {}, isLoggedIn } = auth;
    const { onOpen: onOpenLoginModal } = loginModal;
    const { push } = routePush;
    const { copy } = scraper;
    const { destroy } = recordDestroy;

    const isOwner = currentUserId && recipeUserId === currentUserId;
    const onEdit = () => push(`/recipes/${id}/edit`);
    const onDelete = () => destroy({ resource: 'recipe', id });
    const onCopy = () => copy(recipe.record);

    const record = { ...recipeRecord };
    record.source = source ? source.record : null;
    record.book = book ? book.record : null;
    record.user = user ? user.record : null;

    return (
      <ViewPres
        {...{
          isLoggedIn,
          isOwner,
          onCopy,
          onDelete,
          onEdit,
          onOpenLoginModal,
          record,
        }}
      />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <ViewController resource={'recipes'} id={id} render={renderFunc} />,
        (render, { record: { source } = {} }) => (
          <Record resource={'sources'} id={source} render={render} />
        ),
        (render, { record: { book } = {} }) => (
          <Record resource={'books'} id={book} render={render} />
        ),
        (render, { record: { user } = {} }) => (
          <Record resource={'users'} id={user} render={render} />
        ),
        <Auth />,
        <Modal name={LOGIN_MODAL} />,
        <RoutePush />,
        <Scraper />,
        <RecordDestroy
          {...{
            resource: 'recipes',
            id,
            authorize: true,
            meta: { onSuccess: { redirect: {}, snackbar: {} } },
          }}
        />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default View;
