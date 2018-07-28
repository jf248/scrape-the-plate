import React from 'react';
import { Button, Grid, Tooltip, withStyles } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';

import { AppContent, AppSearchBar, AppFabButton } from 'lib/mui-app';

import { ListItem, Pagination, Filter } from './components';
import { FlexContainer, FlexGrow, FlexShrink } from 'components/utils';

const styles = theme => ({
  list: {
    padding: theme.spacing.unit,
    display: 'flex',
    flexWrap: 'wrap',
  },
  content: {
    justifyContent: 'center',
  },
  rightButton: {
    marginLeft: theme.spacing.unit,
  },
});

class ListPres extends React.PureComponent {
  render() {
    const {
      classes,

      data,
      ids,
      onAddClick,
      params,
      setFilter,
      setPage,
      total,
    } = this.props;

    const tooltipTitle = 'Scrape a recipe for a URL. Or create your own.';
    return (
      <React.Fragment>
        <AppSearchBar>
          <FlexContainer>
            <FlexGrow>
              <Filter onChange={setFilter} filter={params.filter} />
            </FlexGrow>
            <FlexShrink>
              <Tooltip title={tooltipTitle}>
                <Button
                  variant={'contained'}
                  onClick={onAddClick}
                  color={'secondary'}
                >
                  {'Add a recipe'}
                  <AddCircle className={classes.rightButton} />
                </Button>
              </Tooltip>
            </FlexShrink>
          </FlexContainer>
        </AppSearchBar>
        <AppContent className={classes.content}>
          {ids && (
            <Grid container spacing={16}>
              {ids.map(id => (
                <Grid item xs={12} sm={6} md={4} key={id}>
                  <ListItem {...{ recipe: data[id] }} />
                </Grid>
              ))}
            </Grid>
          )}
          <div className={classes.list} />
          <Pagination
            countPerPage={ids.length}
            count={total}
            page={params.page}
            onChangePage={setPage}
          />
          <AppFabButton
            variant={'add'}
            tooltipProps={{ title: tooltipTitle }}
            to={`/recipes/create`}
          />
        </AppContent>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ListPres);
