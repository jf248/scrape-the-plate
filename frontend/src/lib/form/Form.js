import { Component } from 'react';
import { omit } from 'lodash';

import { renderProps, callAll } from 'lib/react-powerplug';

import { shallowEqualObjects } from './utils';

function getValue(eventOrValue) {
  if (isEvent(eventOrValue)) {
    return eventOrValue.target.value;
  } else {
    return eventOrValue;
  }
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

function isEvent(candidate) {
  return !!(
    isObject(candidate) &&
    candidate.stopPropagation &&
    candidate.preventDefault
  );
}

class Form extends Component {
  static defaultProps = {
    apiErrors: undefined,
    initialValues: {},
    normalize: x => x,
    normalizeOnChange: false,
    normalizeOnBlur: true,
    validate: () => ({}),
    validateOnChange: false,
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
    const { enableReinitialize, initialValues, apiErrors } = this.props;

    // Reinitialize?
    if (enableReinitialize) {
      const shouldReinitialize =
        enableReinitialize === true
          ? !shallowEqualObjects(prevProps.initialValues, initialValues)
          : enableReinitialize(prevProps.initialValues, initialValues);
      if (shouldReinitialize) {
        this.resetForm(initialValues);
        this.runValidation();
      }
    }

    // New apiErrors?
    if (apiErrors && prevProps.apiErrors !== apiErrors) {
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
          Object.keys(validationErrors).length === 0 &&
          Object.keys(prevState.apiErrors).length === 0;
        return { validationErrors, isValid };
      }, resolve);
    });
  };

  setValues = values => {
    const { normalize } = this.props;
    this._setFieldState('values', values, normalize);
    this.runValidation();
    this.removeApiErrors(Object.keys(values));
  };

  resetValues = (initialValues = {}) => {
    this._resetState('values', initialValues, this.props.normalize);
    this.runValidation();
    this.resetApiErrors();
  };

  setTouched = touched => {
    const { normalize, normalizeOnBlur, validateOnBlur } = this.props;
    this._setFieldState('touched', touched);
    this.setState({ isPristine: false });
    validateOnBlur && this.runValidation();
    normalizeOnBlur && this._setFieldState('values', {}, normalize);
  };

  // We know all the fields, so we changed touched to true
  setTouchedAll = () => {
    this.setState({ touched: true });
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
    const { normalizeOnChange, normalize, validateOnChange } = this.props;
    this._setFieldState(
      'values',
      { [field]: getValue(eventOrValue) },
      normalizeOnChange ? normalize : x => x
    );
    validateOnChange && this.runValidation();
    this.removeApiErrors([field]);
  };

  handleBlur = field => () => {
    this.setTouched({ [field]: true });
  };

  handleSubmit = (values, bag) => {
    const { onSubmit, normalize } = this.props;
    if (onSubmit) {
      return this.runValidation().then(() => {
        if (this.state.isValid) {
          onSubmit(normalize(values), bag);
        }
      });
      //return onSubmit(normalize(values), bag);
    } else {
      console.warn('Form: No onSubmit prop'); // eslint-disable-line no-console
    }
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
    const { submitOnEnter } = this.props;
    const bag = {
      apiErrors,
      isPristine,
      isValid,
      resetApiErrors: this.resetApiErrors,
      resetForm: this.resetForm,
      setApiErrors: this.setApiErrors,
      setTouched: this.setTouched,
      setTouchedAll: this.setTouchedAll,
      setValues: this.setValues,
      touched,
      validate: this.runValidation,
      validationErrors,
      values,
    };

    const handleKeyDown = event => {
      if (submitOnEnter && event.key === 'Enter' && event.shiftKey === false) {
        event.preventDefault();
        this.handleSubmit(values, bag);
      }
    };

    return renderProps(this.props, {
      ...bag,
      getRootProps: (ownProps = {}) => ({
        ...ownProps,
        onKeyDown: callAll(ownProps.onKeyDown, handleKeyDown),
      }),
      getInputProps: (ownProps = {}) => {
        const { name, onChange, onBlur } = ownProps;
        return {
          error: apiErrors[name] || validationErrors[name],
          value: values[name] || '',
          touched: touched === true ? true : touched[name],
          ...ownProps,
          onChange: callAll(onChange, this.handleChange(name)),
          onBlur: callAll(onBlur, this.handleBlur(name)),
        };
      },
      getSubmitProps: (ownProps = {}) => ({
        ...ownProps,
        onClick: callAll(ownProps.onClick, () =>
          this.handleSubmit(values, bag)
        ),
      }),
    });
  }
}

export default Form;
