import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Divider,
  withStyles,
} from '@material-ui/core';

import { ControlWrapper } from '..';
import { UrlField, SitesDialog } from './components';

const styles = () => ({
  actions: {
    justifyContent: 'flex-end',
  },
  scrape: {
    display: 'flex',
  },
});

Step1Pres.defaultProps = {};

function Step1Pres(props) {
  const {
    classes,
    focus,
    getFocusProps,
    getInputProps,
    getModalProps,
    getRootProps,
    getSubmitProps,
    openModal,
    scrapeDisabled,
    selectDomain,
    skip,
    sources,
  } = props;

  return (
    <React.Fragment>
      <Card {...getRootProps()}>
        <CardHeader title={'Scrape a recipe'} />
        <CardContent>
          <ControlWrapper>
            <UrlField
              {...getFocusProps({ refName: 'inputRef' })}
              {...getInputProps({
                name: 'url',
                openSitesModal: () => openModal('sites'),
                focus,
              })}
            />
          </ControlWrapper>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button size={'small'} onClick={skip}>
            Skip (manual entry)
          </Button>
          <Button
            {...getSubmitProps({
              disabled: scrapeDisabled,
              size: 'small',
              color: 'primary',
              variant: 'contained',
            })}
          >
            Scrape
          </Button>
        </CardActions>
      </Card>
      <SitesDialog
        {...getModalProps({ name: 'sites' })}
        onSelectDomain={selectDomain}
        sources={sources}
      />
    </React.Fragment>
  );
}

export default withStyles(styles)(Step1Pres);
