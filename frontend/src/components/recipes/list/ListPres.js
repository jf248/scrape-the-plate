import React from 'react';
import { Button, Hidden, Tooltip, withStyles } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';

import { AppContent, AppSearchBar, AppFabButton } from 'lib/mui-app';

import { ListItem, Pagination, Filter } from './components';
import { FlexContainer, FlexGrow, FlexShrink } from 'components/common';

const styles = theme => ({
  list: {
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
  static defaultProps = {
    ids: [],
  };

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

    const tooltipTitle = 'Scrape a recipe from a URL. Or create your own.';
    return (
      <React.Fragment>
        <AppSearchBar>
          <FlexContainer>
            <FlexGrow>
              <Filter onChange={setFilter} filter={params.filter} />
            </FlexGrow>
            <Hidden xsDown>
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
            </Hidden>
          </FlexContainer>
        </AppSearchBar>
        <AppContent className={classes.content}>
          <div className={classes.list}>
            {ids.map(id => (
              <ListItem {...{ recipe: data[id], key: id }} />
            ))}
          </div>
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
