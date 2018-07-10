import { Component } from 'react';
import { omit } from 'lodash';

import { renderProps, callAll } from 'lib/react-powerplug';

function getValue(eventOrValue) {
  if (isEvent(eventOrValue)) {
    return eventOrValue.target.value;
  } else {
    return eventOrValue;
  }
}

function isEvent(candidate) {
  return !!(candidate && candidate.stopPropagation && candidate.preventDefault);
}

class Form extends Component {
  static defaultProps = {
    apiErrors: undefined,
    initialValues: {},
    normalize: x => x,
    shouldReinitialize: (p, c) => p !== c,
    validate: () => ({}),
    validateOnChange: true,
    validateOnBlur: true,
  };

  state = {
    values: {},
    validationErrors: {},
    apiErrors: {},
    touched: {},
  };

  componentDidMount() {
    this.resetForm(this.props.initialValues);
    this.runValidation();
  }

  componentDidUpdate(prevProps) {
    const { shouldReinitialize, initialValues, apiErrors } = this.props;
    // Reinitialize values?
    if (shouldReinitialize(prevProps.initialValues, initialValues)) {
      this.resetForm(initialValues);
      this.runValidation();
    } else if (apiErrors && prevProps.apiErrors !== apiErrors) {
      this.setApiErrors(apiErrors);
    }
  }

  resetForm = (initialValues = this.props.initialValues) => {
    this.setState({
      values: this.props.normalize(initialValues),
      apiErrors: this.props.apiErrors || {},
      validationErrors: {},
      touched: {},
      isPristine: true,
    });
  };

  _resetState = (key, value = {}, action = x => x) => {
    this.setState({ [key]: action(value) });
  };

  _setFieldState = (key, value = {}, action = x => x) => {
    this.setState(prevState => ({
      [key]: action({ ...prevState[key], ...value }),
    }));
  };

  _removeState = (key, fields) => {
    this.setState(prevState => ({ [key]: omit(prevState[key], fields) }));
  };

  runValidation = () => {
    return new Promise(resolve => {
      this.setState(prevState => {
        const validationErrors = this.props.validate(prevState.values);
        const isValid =
          Object.keys(validationErrors).lengh === 0 &&
          Object.keys(prevState.apiErrors).length === 0;
        return { validationErrors, isValid };
      }, resolve);
    });
  };

  setValues = values => {
    const { normalize, validateOnChange } = this.props;
    this._setFieldState('values', values, normalize);
    validateOnChange && this.runValidation();
    this.removeApiErrors(Object.keys(values));
  };

  resetValues = (initialValues = {}) => {
    this._resetState('values', initialValues, this.props.normalize);
    this.runValidation();
    this.resetApiErrors();
  };

  setTouched = touched => {
    this._setFieldState('touched', touched);
    this.setState({ isPristine: false });
    this.props.validateOnBlur && this.runValidation();
  };

  resetTouched = () => {
    this._resetState('touched');
    this.setState({ isPristine: true });
  };

  setApiErrors = (apiErrors = {}) => {
    this._setFieldState('apiErrors', apiErrors);
    const touched = { ...apiErrors };
    Object.keys(apiErrors).forEach(key => (touched[key] = true));
    this.setTouched(touched);
  };

  resetApiErrors = () => {
    this._resetState('apiErrors');
  };

  removeApiErrors = fields => {
    this._removeState('apiErrors', fields);
  };

  handleChange = field => eventOrValue => {
    this.setValues({ [field]: getValue(eventOrValue) });
  };

  handleBlur = field => () => {
    this.setTouched({ [field]: true });
  };

  render() {
    const {
      values,
      touched,
      validationErrors,
      apiErrors,
      isValid,
      isPristine,
    } = this.state;
    const { onSubmit } = this.props;
    const bag = {
      apiErrors,
      isPristine,
      isValid,
      resetApiErrors: this.resetApiErrors,
      resetForm: this.resetForm,
      setApiErrors: this.setApiErrors,
      setTouched: this.setTouched,
      setValues: this.setValues,
      touched,
      validate: this.runValidation,
      validationErrors,
      values,
    };

    return renderProps(this.props, {
      ...bag,
      getInputProps: (ownProps = {}) => {
        const { name, onChange, onBlur } = ownProps;
        return {
          error: apiErrors[name] || validationErrors[name],
          value: values[name] || '',
          touched: touched[name],
          ...ownProps,
          onChange: callAll(onChange, this.handleChange(name)),
          onBlur: callAll(onBlur, this.handleBlur(name)),
        };
      },
      getSubmitProps: (ownProps = {}) => ({
        ...ownProps,
        onClick: callAll(ownProps.onClick, () => onSubmit(values, bag)),
      }),
    });
  }
}

export default Form;
