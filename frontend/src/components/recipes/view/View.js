import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { Auth } from 'lib/auth';

import { Modal } from 'controllers/modal';
import { RoutePush } from 'controllers/route-push';
import { Scraper } from 'controllers/scraper';
import { View as ViewController } from 'controllers/view';
import { Crud } from 'controllers/crud';
import { LOGIN_MODAL, CONFIRMATION_MODAL } from 'components/frame';
import ViewPres from './ViewPres';

function View(props) {
  const { id } = props;
  const renderFunc = (
    view,
    auth,
    loginModal,
    confirmationModal,
    routePush,
    scraper,
    crud
  ) => {
    const { record: recipe } = view;
    const { user: recipeUserId } = recipe || {};
    const { user: { id: currentUserId } = {}, isLoggedIn } = auth;
    const { onOpen: onOpenLoginModal } = loginModal;
    const { onOpen: onOpenConfirmation } = confirmationModal;
    const { push } = routePush;
    const { copy } = scraper;
    const { destroy } = crud;

    const isOwner = currentUserId && recipeUserId === currentUserId;
    const onClickEdit = () => push(`/recipes/${id}/edit`);
    const onClickCopy = () => copy(recipe);
    const onClickDelete = () =>
      onOpenConfirmation({
        title: 'Delete this recipe?',
        onConfirm: () => destroy({ id }),
      });
    const onMoreButtonClick = () => {
      if (!isLoggedIn) {
        onOpenLoginModal();
      }
    };

    return (
      <ViewPres
        {...{
          isLoggedIn,
          isOwner,
          onClickCopy,
          onClickDelete,
          onClickEdit,
          onMoreButtonClick,
          recipe,
        }}
      />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <ViewController resource={'recipes'} id={id} />,
        <Auth />,
        <Modal name={LOGIN_MODAL} />,
        <Modal name={CONFIRMATION_MODAL} />,
        <RoutePush />,
        <Scraper />,
        <Crud
          {...{
            resource: 'recipes',
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
