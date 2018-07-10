const isFn = prop => typeof prop === 'function';

const renderProps = ({ children, render }, ...props) => {
  const fn = isFn(children) ? children : render;
  if (!fn) {
    throw new Error('No render function supplied to renderProps');
  }
  return fn ? fn(...props) : null;
};

export default renderProps;
