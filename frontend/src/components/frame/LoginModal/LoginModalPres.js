import React from 'react';
import { Dialog, DialogContent, Tab, Tabs } from '@material-ui/core';

import LoginContent from './LoginContent';
import SignupContent from './SignupContent';

function LoginModalPres(props) {
  const { isOpen, closeModal, tabsValue, onTabChange } = props;
  const contents = [LoginContent, SignupContent];
  return (
    <Dialog open={isOpen} onClose={closeModal} disableBackdropClick>
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
      {React.createElement(contents[tabsValue])}
    </Dialog>
  );
}

export default LoginModalPres;
