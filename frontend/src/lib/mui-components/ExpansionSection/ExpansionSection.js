import React from 'react';
import classNames from 'classnames';
import { withStyles, Collapse } from '@material-ui/core';
import { State } from 'lib/react-powerplug';

import ExpansionSummary from './ExpansionSummary';

export const styles = theme => {
  const transition = {
    duration: theme.transitions.duration.shortest,
    easing: theme.transitions.easing.ease,
  };

  return {
    root: {
      position: 'relative',
      margin: 0,
      transition: theme.transitions.create(['margin'], transition),
      '&:before': {},
      '&:first-child': {
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        '&:before': {
          display: 'none',
        },
      },
      '&:last-child': {
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
      },
      '&$expanded + &': {
        '&:before': {
          display: 'none',
        },
      },
    },
    expanded: {
      margin: `${theme.spacing.unit * 2}px 0`,
      '&:first-child': {
        marginTop: 0,
      },
      '&:last-child': {
        marginBottom: 0,
      },
      '&:before': {
        opacity: 0,
      },
    },
  };
};

ExpansionSection.defaultProps = {
  component: 'div',
  initialExpanded: false,
};

function ExpansionSection(props) {
  const {
    children: childrenProp,
    classes,
    className: classNameProp,
    component,
    CollapseProps: CollapsePropsProp,
    initialExpanded,
    expanded: expandedProp,
    onChange,
    ...rest
  } = props;

  const Component = component || 'div';
  const renderFunc = ({ state: { expanded }, setState }) => {
    const handleChange = event => {
      onChange && onChange(event, !expanded);
      setState({ expanded: !expanded });
    };

    const className = classNames(
      classes.root,
      {
        [classes.expanded]: expanded,
      },
      classNameProp
    );

    let summary = null;

    const children = React.Children.map(childrenProp, child => {
      if (!React.isValidElement(child)) {
        return null;
      }

      if (child.type === ExpansionSummary) {
        summary = React.cloneElement(child, {
          expanded,
          onChange: handleChange,
        });
        return null;
      }

      return child;
    });

    const CollapseProps = !expanded
      ? {
          'aria-hidden': 'true',
        }
      : null;

    return (
      <Component className={className} {...rest}>
        {summary}
        <Collapse
          in={expanded}
          timeout="auto"
          {...CollapseProps}
          {...CollapsePropsProp}
        >
          {children}
        </Collapse>
      </Component>
    );
  };

  return (
    <State
      expanded={expandedProp}
      initial={{ expanded: initialExpanded }}
      render={renderFunc}
    />
  );
}

export default withStyles(styles)(ExpansionSection);
