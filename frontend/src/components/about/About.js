import React from 'react';
import { Typography, withStyles } from '@material-ui/core';

import { AppContent } from 'lib/mui-app';
import { Link } from 'lib/mui-components';
//////
import ComboboxField from 'lib/mui-components/ComboboxField'
import { State } from 'lib/react-powerplug'

const DATA = [
  {text: 'apple', group: 'fruits'},
  {text: 'banana', group: 'fruits'},
  {text: 'grapefruit', group: 'fruits'},
  {text: 'lemon', group: 'fruits'},
  {text: 'mango', group: 'fruits'},
  {text: 'orange', group: 'fruits'},
  {text: 'papaya', group: 'fruits'},
  {text: 'pear', group: 'fruits'},
  {text: 'pineapple', group: 'fruits'},
  {text: 'pomegranate', group: 'fruits'},
  {text: 'brocoli', group: 'vegetables'},
  {text: 'cabbage', group: 'vegetables'},
  {text: 'carrot', group: 'vegetables'},
  {text: 'cauliflower', group: 'vegetables'},
  {text: 'lettuce', group: 'vegetables'},
  {text: 'onion', group: 'vegetables'},
  {text: 'pea', group: 'vegetables'},
  {text: 'potato', group: 'vegetables'},
  {text: 'spinach', group: 'vegetables'},
  {text: 'tomato', group: 'vegetables'},
  {text: 'bread'},
  {text: 'eggs'},
  {text: 'lentils'},
  {text: 'milk'},
  {text: 'rice'},

];

const StoryComboxField = (props) => (
  <ComboboxField
    TextFieldProps={{
      label: 'Choose a food',
      placeholder: 'Try typing "orange"...',
      name: 'combobox',
    }}
    items={DATA}
    menuBottomElement={
      <div>{'Click here'}</div>
    }
    {...props}
    itemToString={item => item === null ? '' : item.text}
  />
);

/////

const styles = () => ({
  root: {
    paddingTop: 32,
  },
});

function About(props) {
  const { classes } = props;

  return (
    <AppContent className={classes.root}>
      <Typography variant={'body1'} paragraph>
        Scrape recipes, store them and keep them organised.
      </Typography>
      <Typography variant={'body1'} paragraph>
        Created with React, Redux and Django. Source code available{' '}
        <Link href={'https://www.github.com/jf248/scrape-the-plate'}>here</Link>.
      </Typography>
      <Typography variant={'body1'} paragraph>
        by <Link href={'https://www.github.com/jf248'}>Josh Freedman</Link>
      </Typography>
      <br/>


    <State
      initial={{cSelectedItem: DATA[1]}}
      render={({state, setState}) =>
          <div>
            <div>{`Selected Item: ${state.cSelectedItem ? state.cSelectedItem.text : '[None]'}`}</div>
            <div>{`Or first selected Items: ${state.cSelectedItem && state.cSelectedItem[0] ? state.cSelectedItem[0].text : '[None]'}`}</div>
            <div>
              <StoryComboxField
                selectedItem={state.cSelectedItem}
                onChange={i => setState({cSelectedItem: i})}
                isOpen
              />
            </div>
          </div>
      }
    />

    </AppContent>
  );
}

export default withStyles(styles)(About);
