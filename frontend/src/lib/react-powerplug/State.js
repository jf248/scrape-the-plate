import { Component } from 'react';

import { renderProps, noop } from './utils';

class State extends Component {
  state = {
    ...this.props.initial,
  };

  static defaultProps = {
    stateReducer: (prevState, changes) => changes,
    onChange: noop,
  };

  componentDidUpdate(prevProps) {
    // Reinitialize?
    const { enableReinitialize, initial } = this.props;
    if (enableReinitialize) {
      const shouldReinitialize =
        enableReinitialize === true
          ? initial !== prevProps.initial
          : enableReinitialize(prevProps.initial, initial);
      if (shouldReinitialize) {
        return this.setState({ ...initial });
      }
    }
  }

  isControlledProp = key => {
    return this.props[key] !== undefined;
  };

  getState = (stateToMerge = this.state) => {
    return Object.keys(stateToMerge).reduce((state, key) => {
      state[key] = this.isControlledProp(key)
        ? this.props[key]
        : this.state[key];
      return state;
    }, {});
  };

  /**
   * Each piece of state can either be (a) uncontrolled, this.state and changed
   * with this.setState or (b) controlled, this.props which is changed with
   * this.props.onChange.
   */
  _setState = (updater, cb) => {
    const { stateReducer, onChange } = this.props;
    const updaterIsFunction = typeof updater === 'function';
    const changes = {};
    const nextState = {};
    return this.setState(
      prevState => {
        prevState = this.getState(prevState);
        let newStateToSet = updaterIsFunction ? updater(prevState) : updater;
        newStateToSet = stateReducer(prevState, newStateToSet);
        Object.keys(newStateToSet).forEach(key => {
          if (newStateToSet[key] !== prevState[key]) {
            changes[key] = newStateToSet[key];
          }
          if (!this.isControlledProp(key)) {
            nextState[key] = newStateToSet[key];
          }
        });
        return nextState;
      },
      () => {
        cb && cb();
        if (changes.length !== 0) {
          onChange(changes, this.getState());
        }
      }
    );
  };

  render() {
    return renderProps(this.props, {
      state: this.getState(),
      setState: this._setState,
    });
  }
}

export default State;
