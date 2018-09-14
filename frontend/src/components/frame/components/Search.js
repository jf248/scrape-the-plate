import React from 'react';

import * as PowerPlug from 'lib/react-powerplug';

import { RoutePush } from 'controllers/route-push';
import SearchPres from './SearchPres';

Search.defaultProps = {
  query: '',
};

function Search(props) {
  const { query, ...rest } = props;

  const renderFunc = ({ state, setState }, { push }) => {
    const value = state.query;
    const onChange = event => setState({ query: event.target.value });
    const onSubmit = () => push(`/search/${state.query}/`);
    const onBlur = () => setState({ query });
    return <SearchPres {...{ onSubmit, value, onChange, onBlur, ...rest }} />;
  };

  return (
    /* eslint-disable react/jsx-key */
    <PowerPlug.Compose
      components={[
        <PowerPlug.State initial={{ query }} enableReinitialize />,
        <RoutePush />,
      ]}
      render={renderFunc}
    />
    /* eslint-enable react/jsx-key */
  );
}

export default Search;
