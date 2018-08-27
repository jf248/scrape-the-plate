import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import StickyList from './index';
const ITEMS = [
  { text: 'apple', group: 'fruits' },
  { text: 'banana', group: 'fruits' },
  { text: 'grapefruit', group: 'fruits' },
  { text: 'lemon', group: 'fruits' },
  { text: 'mango', group: 'fruits' },
  { text: 'orange', group: 'fruits' },
  { text: 'papaya', group: 'fruits' },
  { text: 'brocoli', group: 'vegetables' },
  { text: 'cabbage', group: 'vegetables' },
  { text: 'carrot', group: 'vegetables' },
  { text: 'cauliflower', group: 'vegetables' },
  { text: 'lettuce', group: 'vegetables' },
  { text: 'onion', group: 'vegetables' },
  { text: 'bread', group: 'other' },
  { text: 'eggs', group: 'other' },
  { text: 'lentils', group: 'other' },
  { text: 'milk', group: 'other' },
  { text: 'rice', group: 'other' },
];

const ROW_HEIGHT = 20;
const Example = ({ items, width, height }) => (
  <div>
    <StickyList
      {...{
        height: 100,
        items,
        labelRenderer: ({ label, style }) => (
          <div
            style={{
              ...style,
              height: ROW_HEIGHT,
              backgroundColor: 'white',
              lineHeight: `${ROW_HEIGHT}px`,
            }}
          >
            <b>{label}</b>
          </div>
        ),
        rowHeight: ROW_HEIGHT,
        rowRenderer: ({ index, style }) => (
          <div
            style={{
              ...style,
              height: ROW_HEIGHT,
              backgroundColor: 'white',
              lineHeight: `${ROW_HEIGHT}px`,
              paddingLeft: 8,
            }}
          >
            {items[index].text}
          </div>
        ),
        width: 300,
      }}
    />
    <br />
    <div style={{ fontWeight: 'bold' }}>items prop:</div>
    <pre>{JSON.stringify(items, null, 2)}</pre>
  </div>
);

storiesOf('StickyList', module).add('basic', () => (
  <Example {...{ items: ITEMS, width: 300, height: 100 }} />
));
