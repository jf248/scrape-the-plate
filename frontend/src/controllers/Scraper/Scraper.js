import React from 'react';

import { Queue } from 'lib/redux-queue';
import { RecordsMany } from 'lib/crud';
import WithStore from 'lib/with-store';
import { Compose, renderProps } from 'lib/react-powerplug';

import Form from 'controllers/Form';
import { goBack, skip } from './actions';
import { SCRAPER } from './names';
import validate from './validate';
import normalize from './normalize';

function Scraper(props) {
  const renderFunc = (sources, form, stepper, store) => {
    const {
      response: scrapedData,
      getInputProps,
      getSubmitProps,
      setValues,
      isSubmitting,
    } = form;
    const { queue } = stepper;
    const { goBack, skip } = store;

    const selectDomain = domainName => () => {
      setValues({ url: `http://${domainName}/` });
    };

    const activeStep = queue.length;
    const url = scrapedData ? scrapedData.url : '';
    return renderProps(props, {
      url,
      scrapedData,
      activeStep,
      skip,
      goBack,
      sources,
      getInputProps,
      getSubmitProps,
      selectDomain,
      isSubmitting,
    });
  };

  /* eslint-disable react/jsx-key */
  return (
    <Compose
      components={[
        <RecordsMany resource="sources" />,
        (render, { data: sources }) => (
          <Form
            name={SCRAPER}
            validate={validate(sources)}
            normalize={normalize}
            render={render}
          />
        ),
        <Queue name={SCRAPER} />,
        <WithStore actionCreators={{ goBack, skip }} />,
      ]}
      render={renderFunc}
    />
  );
  /* eslint-enable react/jsx-key */
}

export default Scraper;
