import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { renderProps } from 'lib/react-powerplug';

import {
  register,
  unregister,
  submit,
  setSubmitting,
  setError,
  setResponse,
} from './actions';

class FormController extends PureComponent {
  componentDidMount() {
    register(this.props.name);
  }

  componentWillUnmount() {
    unregister(this.props.name);
  }

  render() {
    const {
      submit,
      setSubmitting,
      setResponse,
      setError,
      isSubmitting,
      response,
      error,
    } = this.props;
    return renderProps(this.props, {
      submit,
      setSubmitting,
      setError,
      setResponse,
      isSubmitting,
      response,
      error,
    });
  }
}

const mapStateToProps = (state, ownProps) => {
  const { name = 'form' } = ownProps;
  const form = state.form[name] || {};
  return {
    isSubmitting: form.isSubmitting || false,
    error: form.error || null,
    response: form.response || null,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { name } = ownProps;
  return {
    submit: (data, meta) => dispatch(submit(name, data, meta)),
    setSubmitting: () => dispatch(setSubmitting(name)),
    setError: payload => dispatch(setError(name, payload)),
    setResponse: payload => dispatch(setResponse(name, payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormController);
