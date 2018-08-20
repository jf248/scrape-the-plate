/**
 * Copied from material-ui. This is an internal component that isn't exported.
 */

import React from 'react';

import Textarea from './TextArea';

/**
 * Wrapper around <input/> to stop cursor jumping to the end when a controlled
 * component.
 * @see: https://stackoverflow.com/a/35295650
 */

class InputCursorCorrect extends React.Component {
  constructor(props) {
    super(props);
    this.handleRef = this.handleRef.bind(this);
  }

  handleRef(node) {
    const { inputRef } = this.props;
    inputRef && typeof inputRef === 'function' && inputRef(node);
    this.textInput = node;
  }

  componentDidMount() {
    // Not controlled, nothing to update
    if (this.props.value === undefined) {
      return;
    }
    // Set value of the input to props.value
    var node = this.textInput;
    node.value = this.props.value;
  }

  componentDidUpdate() {
    // Not controlled, nothing to update
    if (this.props.value === undefined) {
      return;
    }

    // Set value of the input to props.value
    var node = this.textInput;
    node.value = this.props.value;

    // If not 'number' type, set the selectionStart and selectionEnd
    if (!this.props.type === 'number') {
      var oldLength = node.value.length;
      var oldIdx = node.selectionStart;
      var newIdx = Math.max(0, node.value.length - oldLength + oldIdx);
      node.selectionStart = node.selectionEnd = newIdx;
    }
  }

  render() {
    const { inputRef, multiline, ...rest } = this.props; // eslint-disable-line no-unused-vars
    const Component = multiline ? Textarea : 'input';
    return <Component {...rest} ref={this.handleRef} value={undefined} />;
  }
}

export default InputCursorCorrect;
