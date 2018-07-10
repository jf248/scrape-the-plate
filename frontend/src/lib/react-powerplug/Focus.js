import React, { Component } from 'react';
import State from './State';
import { renderProps, noop, callAll } from './utils';

class Focus extends Component {
  static defaultProps = {
    forwardRef: noop,
    onFocus: noop,
    onBlur: noop,
  };

  focus = () => {
    this.focusEl.focus();
  };

  blur = () => {
    this.focusEl.blur();
  };

  focusRef = focusEl => {
    this.focusEl = focusEl;
    this.props.forwardRef(focusEl);
  };

  renderFunc = ({ state, setState }) => {
    const { onFocus, onBlur } = this.props;
    const handleFocus = () => setState({ focused: true });
    const handleBlur = () => setState({ focused: false });
    const getFocusProps = ({ refName = 'ref', ...otherProps }) => {
      return {
        ...otherProps,
        [refName]: this.focusRef,
        onFocus: callAll(otherProps.onFocus, onFocus, handleFocus),
        onBlur: callAll(otherProps.onBlur, onBlur, handleBlur),
      };
    };

    return renderProps(this.props, {
      focus: this.focus,
      blur: this.blur,
      getFocusProps,
      focused: state.focused,
    });
  };

  render() {
    return (
      <State
        initial={{ focused: false }}
        onChange={this.props.onChange}
        render={this.renderFunc}
      />
    );
  }
}

export default Focus;
