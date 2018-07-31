import React from 'react';

import { Scraper } from 'controllers/scraper';

import CreatePres from './CreatePres';

function Create() {
  const renderFunc = scraperProps => {
    return <CreatePres {...scraperProps} />;
  };

  return <Scraper render={renderFunc} />;
}

export default Create;
