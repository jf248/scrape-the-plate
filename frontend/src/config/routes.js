import React from 'react';
import { List, Create, Update, View } from 'components/recipes';
import { About } from 'components/about';
// import { TempPage } from 'components/temp';
import { NotFound } from 'components/not-found';

const routes = [
  {
    path: '/recipes',
    component: props => <List variant={'all'} {...props} />,
    exact: true,
    title: 'Recipes',
  },
  {
    path: '/recipes/mine',
    component: props => <List variant={'mine'} {...props} />,
    exact: true,
    title: 'Recipes',
  },
  {
    path: '/recipes/create',
    component: Create,
    exact: true,
    title: 'Create a recipe',
  },
  {
    path: '/recipes/:id/edit',
    component: Update,
    exact: true,
    title: 'Edit the recipe',
  },
  {
    path: '/recipes/:id',
    component: ({
      match: {
        params: { id },
      },
      ...rest
    }) => <View id={id} {...rest} />,
    title: 'Recipe',
    exact: true,
  },
  {
    path: '/tags/:tagId',
    component: ({
      match: {
        params: { tagId },
      },
      ...rest
    }) => <List variant={'tags'} tagId={tagId} {...rest} />,
    title: 'Tag',
    exact: true,
  },
  { path: '/about', component: About, exact: true, title: 'About' },
  // { path: '/temp', component: TempPage, exact: true, title: 'Temporary Page' },
  {
    path: '/search/:query',
    component: ({
      match: {
        params: { query },
      },
      ...rest
    }) => <List variant={'search'} searchQuery={query} {...rest} />,
    exact: true,
    title: 'Search',
  },
  { path: '/', component: List, exact: true, title: 'Recipes' },
  { path: '*', component: NotFound, exact: false, title: 'Not Found' },
];

export default routes;
