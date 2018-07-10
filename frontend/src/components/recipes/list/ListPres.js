import React from 'react';
import { withStyles } from '@material-ui/core';

import { AppContent, AppSearchBar, AppFabButton } from 'lib/mui-app';

import { ListItem, Pagination, Filter } from './components';

const styles = theme => ({
  list: {
    padding: theme.spacing.unit,
    display: 'flex',
    flexWrap: 'wrap',
  },
  content: {
    justifyContent: 'center',
  },
});

class ListPres extends React.PureComponent {
  render() {
    const {
      classes,
      setFilter,
      params,
      data,
      total,
      setPage,
      ids,
    } = this.props;
    return (
      <React.Fragment>
        <AppSearchBar>
          <Filter onChange={setFilter} filter={params.filter} />
        </AppSearchBar>
        <AppContent className={classes.content}>
          <div className={classes.list}>
            {ids && ids.map(id => <ListItem key={id} item={data[id]} />)}
          </div>
          <Pagination
            countPerPage={ids.length}
            count={total}
            page={params.page}
            onChangePage={setPage}
          />
        </AppContent>
        <AppFabButton variant={'add'} to={`/recipes/create`} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ListPres);
