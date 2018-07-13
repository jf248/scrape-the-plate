import React from 'react';
import { Button, Tooltip, withStyles } from '@material-ui/core';

import { AppContent, AppSearchBar, AppFabButton } from 'lib/mui-app';

import { ListItem, Pagination, Filter } from './components';
import { FlexContainer, FlexLeft, FlexRight } from 'components/utils';

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
      push,
    } = this.props;
    return (
      <React.Fragment>
        <AppSearchBar>
          <FlexContainer>
            <FlexLeft>
              <Filter onChange={setFilter} filter={params.filter} />
            </FlexLeft>
            <FlexRight>
              <Tooltip title={'Scrape a recipe for a URL. Or create your own.'}>
                <Button onClick={() => push('/recipes/create')} color={'primary'}>{'+ scrape / create'}</Button>
              </Tooltip>
            </FlexRight>
          </FlexContainer>
        </AppSearchBar>
        <AppContent className={classes.content}>
          <div className={classes.list}>
            {ids && ids.map(id => <ListItem key={id} item={data[id]} push={push}/>)}
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
