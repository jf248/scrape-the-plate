import React from 'react';
import { withStyles } from '@material-ui/core';

import { AppContent, AppSearchBar, AppFabButton } from 'lib/mui-app';

import { ListItem, Pagination, Filter, OnlyUserToggle } from './components';
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
      filter,
      page,
      setFilter,
      setPage,
      total,
      onlyUser,
      onOnlyUserToggle,
    } = this.props;

    return (
      <React.Fragment>
        <AppSearchBar>
          <FlexContainer>
            <FlexGrow>
              <Filter onChange={setFilter} filter={filter} />
            </FlexGrow>
            <FlexShrink>
              <OnlyUserToggle value={onlyUser} onToggle={onOnlyUserToggle} />
            </FlexShrink>
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
            page={page}
            onChangePage={setPage}
          />
          <AppFabButton
            extendedText={'Add a recipe'}
            variant={'add'}
            to={`/recipes/create`}
          />
        </AppContent>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ListPres);
