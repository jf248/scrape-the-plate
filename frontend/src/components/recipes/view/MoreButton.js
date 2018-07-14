import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { Auth } from 'lib/auth';

import LoginModal from 'controllers/LoginModal';
import RoutePush from 'controllers/RoutePush';
import MoreButtonPres from './MoreButtonPres';

function MoreButton(props) {
  const { recipe } = props;

  const renderFunc = (auth, loginModal, routePush) => {
    const { user: { id: currentUserId } = {} } = auth;
    const { open: openLoginModal } = loginModal;
    const { push } = routePush;
    const isOwner = currentUserId && recipeUserId === currentUserId;
    const onEdit = () => push(`/recipes/${id}/edit`)
    const onDelete = () => destroy({resource: 'recipe', id})
    const onCopy = () => copy(recipe)
    return (
      <MoreButtonPres {...{id, isOwner, openLoginModal}} />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
  <Compose
    components={[
        <Auth/>,
        <LoginModal/>,
        <RoutePush/>,
    ]}
    render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default MoreButton;
