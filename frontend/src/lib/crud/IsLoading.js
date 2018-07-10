import { connect } from 'react-redux';

import { renderProps } from 'lib/react-powerplug';

function IsLoading(props) {
  return renderProps(props, props);
}

const mapStateToProps = store => ({
  isLoading: store.crud.isLoading > 0,
});

export default connect(mapStateToProps)(IsLoading);
