import { List, Create, Update, View } from 'components/recipes';
import { About } from 'components/about';
import { TempPage } from 'components/temp';
import { NotFound } from 'components/not-found';

const routes = [
  { path: '/recipes', component: List, exact: true, title: 'Recipes' },
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
  { path: '/recipes/:id', component: View, exact: true },
  { path: '/about', component: About, exact: true, title: 'About' },
  { path: '/temp', component: TempPage, exact: true, title: 'Temporary Page' },
  { path: '/', component: List, exact: true, title: 'Recipes' },
  { path: '*', component: NotFound, exact: false, title: 'Not Found' },
];

export default routes;
