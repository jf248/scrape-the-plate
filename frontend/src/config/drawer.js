import { HelpOutline, Add } from '@material-ui/icons';

import { PlateIcon } from 'components/icons';

const drawer = [
  { text: 'Scrape / Create', path: '/recipes/create', Icon: Add },
  { text: 'Recipes', path: '/recipes', Icon: PlateIcon },
  { text: 'About', path: '/about', Icon: HelpOutline },
];

export default drawer;
