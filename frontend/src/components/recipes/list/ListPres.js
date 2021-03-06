import React from 'react';
import * as Mui from '@material-ui/core';

import {
  AppContent,
  AppSecondaryToolbar,
  AppFabButton,
} from 'components/frame';
import { ListItem, Pagination } from './components';

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
    const { classes, ids, page, perPage, push, setPage, total } = this.props;

    if (ids.length === 0) {
      return (
        <AppContent className={classes.content}>
          <Mui.Typography variant={'caption'}>
            {'No recipes found.'}
          </Mui.Typography>
        </AppContent>
      );
    }

    return (
      <React.Fragment>
        <AppSecondaryToolbar>
          <Pagination
            perPage={perPage}
            total={total}
            page={page}
            onChangePage={setPage}
          />
        </AppSecondaryToolbar>
        <AppContent className={classes.content}>
          <div className={classes.list}>
            {ids.map(id => (
              <ListItem {...{ key: id, id }} />
            ))}
          </div>
          <AppFabButton
            extendedText={'Add a recipe'}
            variant={'add'}
            onClick={() => push(`/recipes/create`)}
            tooltipTitle={'Add a recipe'}
          />
        </AppContent>
      </React.Fragment>
    );
  }
}

export default Mui.withStyles(styles)(ListPres);
