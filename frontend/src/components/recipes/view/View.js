import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { Record } from 'lib/crud';
import { Auth } from 'lib/auth';

import LoginModal from 'controllers/LoginModal';
import RoutePush from 'controllers/RoutePush';
import Scraper from 'controllers/Scraper';
import ViewController from 'controllers/View';
import RecordDestroy from 'controllers/RecordDestroy';
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
    auth,
    loginModal,
    routePush,
    scraper,
    recordDestroy
  ) => {
    const { record: recipeRecord } = recipe;
    const { user: recipeUserId } = recipeRecord || {};
    const { record: sourceRecord } = source;
    const { user: { id: currentUserId } = {}, isLoggedIn } = auth;
    const { open: openLoginModal } = loginModal;
    const { push } = routePush;
    const { copy } = scraper;
    const { destroy } = recordDestroy;

    const isOwner = currentUserId && recipeUserId === currentUserId;
    const onEdit = () => push(`/recipes/${id}/edit`);
    const onDelete = () => destroy({ resource: 'recipe', id });
    const onCopy = () => copy(recipe.record);
    const record = { ...recipeRecord };
    record.source = sourceRecord;

    return (
      <ViewPres
        {...{
          isLoggedIn,
          isOwner,
          onCopy,
          onDelete,
          onEdit,
          openLoginModal,
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
        (render, { record: { source: sourceId } = {} }) => (
          <Record resource={'sources'} id={sourceId} render={render} />
        ),
        <Auth />,
        <LoginModal />,
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
