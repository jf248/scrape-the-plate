import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import * as Virtualized from 'react-virtualized';

import * as Enhanced from 'lib/mui-components';
import * as PowerPlug from 'lib/react-powerplug';

const ITEMS = [
  { text: 'apple', group: 'fruits' },
  { text: 'banana', group: 'fruits' },
  { text: 'grapefruit', group: 'fruits' },
  { text: 'lemon', group: 'fruits' },
  { text: 'mango', group: 'fruits' },
  { text: 'orange', group: 'fruits' },
  { text: 'papaya', group: 'fruits' },
  { text: 'pear', group: 'fruits' },
  { text: 'pineapple', group: 'fruits' },
  { text: 'pomegranate', group: 'fruits' },
  { text: 'brocoli', group: 'vegetables' },
  { text: 'cabbage', group: 'vegetables' },
  { text: 'carrot', group: 'vegetables' },
  { text: 'cauliflower', group: 'vegetables' },
  { text: 'lettuce', group: 'vegetables' },
  { text: 'onion', group: 'vegetables' },
  { text: 'pea', group: 'vegetables' },
  { text: 'potato', group: 'vegetables' },
  { text: 'spinach', group: 'vegetables' },
  { text: 'tomato', group: 'vegetables' },
  { text: 'bread' },
  { text: 'eggs' },
  { text: 'lentils' },
  { text: 'milk' },
  { text: 'rice' },
];

const StoryComboxDialog = props => (
  <Enhanced.ComboboxDialog
    open
    onChange={action(`selectedItems`)}
    title={'Choose a food'}
    InputProps={{
      placeholder: 'Try typing "orange"...',
      name: 'combobox',
    }}
    items={ITEMS}
    {...props}
    itemToString={item => (item === null ? '' : item.text)}
  />
);

const Controlled = props => (
  <PowerPlug.State>
    {({ state, setState }) => (
      <div>
        <div>{`Selected item: ${state.selectedItems &&
          (props.multiple
            ? state.selectedItems.map(item => item.text).join(', ')
            : state.selectedItems.text)}`}</div>
        <StoryComboxDialog
          {...{
            selectedItems: state.selectedItems,
            onChange: selectedItems => setState({ selectedItems }),
            ...props,
          }}
        />
      </div>
    )}
  </PowerPlug.State>
);

storiesOf('ComboboxDialog', module)
  .add('basic', () => <StoryComboxDialog />)
  .add('multiple', () => <StoryComboxDialog multiple />)
  .add('basic controlled', () => <Controlled />)
  .add('mutliple controlled', () => <Controlled multiple />)
  .add('list', () => (
    <Virtualized.List
      {...{
        width: 200,
        height: 40,
        rowHeight: 40,
        rowRenderer: ({ index, style }) => (
          <div style={{ ...style, height: 40 }}>{`Index: ${index}`}</div>
        ),
        rowCount: 1000,
      }}
    />
  ));
