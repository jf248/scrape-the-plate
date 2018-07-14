import React from 'react';

import { Compose } from 'lib/react-powerplug';
import { Record } from 'lib/crud';

import ViewController from 'controllers/View';
import ViewPres from './ViewPres';

function View(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  const renderFunc = (recipe, source) => {
    const { record: recipeRecord } = recipe;
    const { record: sourceRecord } = source;
    const record = { ...recipeRecord };
    record.source = sourceRecord;

    return <ViewPres {...{ record }} />;
  };

  return (
    /* eslint-disable react/jsx-key */
    <Compose
      components={[
        <ViewController resource={'recipes'} id={id} render={renderFunc} />,
        (render, { record: { source: sourceId } = {} }) => (
          <Record resource={'sources'} id={sourceId} render={render} />
        ),
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default View;
