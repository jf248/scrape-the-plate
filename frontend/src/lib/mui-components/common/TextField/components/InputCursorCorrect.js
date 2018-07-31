import React from 'react';

/**
 * Wrapper around <input/> to stop cursor jumping to the end when a controlled
 * component.
 * @see: https://stackoverflow.com/a/35295650
 */

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleRef = this.handleRef.bind(this);
  }

  handleRef(node) {
    const { inputRef } = this.props;
    inputRef && typeof inputRef === 'function' && inputRef(node);
    this.textInput = node;
  }

  componentDidUpdate() {
    if (this.props.value === undefined || this.props.type === 'number') {
      return;
    }
    var node = this.textInput;
    var oldLength = node.value.length;
    var oldIdx = node.selectionStart;
    node.value = this.props.value;
    var newIdx = Math.max(0, node.value.length - oldLength + oldIdx);
    node.selectionStart = node.selectionEnd = newIdx;
  }

  render() {
    const { inputRef, ...rest } = this.props; // eslint-disable-line no-unused-vars
    return <input {...rest} ref={this.handleRef} value={undefined} />;
  }
}

export default Input;
