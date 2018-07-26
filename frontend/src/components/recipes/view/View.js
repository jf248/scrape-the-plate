import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { Auth } from 'lib/auth';

import Modal from 'controllers/Modal';
import RoutePush from 'controllers/RoutePush';
import Scraper from 'controllers/Scraper';
import ViewController from 'controllers/View';
import Crud from 'controllers/Crud';
import { LOGIN_MODAL } from 'components/frame/LoginModal';
import { CONFIRMATION_MODAL } from 'components/frame/ConfirmationModal';
import ViewPres from './ViewPres';

function View(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
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

    return (
      <ViewPres
        {...{
          isLoggedIn,
          isOwner,
          onClickCopy,
          onClickDelete,
          onClickEdit,
          onOpenLoginModal,
          recipe,
        }}
      />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <ViewController resource={'recipes'} id={id} render={renderFunc} />,
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
