import React from 'react';

import * as PowerPlug from 'lib/react-powerplug';
import * as Crud from 'lib/crud';

import { Modal } from 'controllers/modal';
import * as Tags from 'components/tags';
import * as Common from 'components/common';
import DrawerContentPres from './DrawerContentPres';

const CREATE_TAG = 'CREATE_TAG';

function DrawerContent(props) {
  const { ...rest } = props;

  const renderFunc = (crud, createTagModal) => {
    const { ids, data } = crud;
    const { onOpen } = createTagModal;
    const onClickAddTag = () => onOpen();
    const createTag = (
      <Common.EditResourceDialog
        {...{
          name: CREATE_TAG,
          ...Tags.editDialogProps,
        }}
      />
    );

    const tags = ids.map(id => data[id]);

    return (
      <DrawerContentPres
        onClickAddTag={onClickAddTag}
        tags={tags}
        createTag={createTag}
        {...rest}
      />
    );
  };

  return (
    /* eslint-disable react/jsx-key */
    <PowerPlug.Compose
      components={[
        <Crud.RecordsMany
          resource={'tags'}
          initialParams={{ sort: ['name'] }}
        />,
        <Modal name={CREATE_TAG} />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default DrawerContent;
