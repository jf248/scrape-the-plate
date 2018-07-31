import React from 'react';
import { Dialog, DialogContent, Tab, Tabs } from '@material-ui/core';

import { LoginContent, SignupContent } from './components';

function LoginModalPres(props) {
  const { isOpen, onClose, tabsValue, onTabChange } = props;
  const contents = [LoginContent, SignupContent];
  return (
    <Dialog open={isOpen} onClose={onClose} disableBackdropClick>
      <DialogContent>
        <Tabs
          value={tabsValue}
          onChange={onTabChange}
          indicatorColor={'primary'}
        >
          <Tab label={'Log in'} />
          <Tab label={'Sign up'} />
        </Tabs>
      </DialogContent>
      {React.createElement(contents[tabsValue], { onClose })}
    </Dialog>
  );
}

export default LoginModalPres;
