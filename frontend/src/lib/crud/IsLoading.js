import { connect } from 'react-redux';

import { renderProps } from 'lib/react-powerplug';

function IsLoading(props) {
  const { isLoading } = props;
  return renderProps(props, { isLoading });
}

const mapStateToProps = state => ({
  isLoading: state.crud.loading > 0,
});

export default connect(mapStateToProps)(IsLoading);
