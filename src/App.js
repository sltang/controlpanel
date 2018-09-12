import React, { Component } from 'react';
import './App.css';
//import ClippedDrawer from './appdrawer/clippeddrawer'

import Login from './login/login';

class App extends Component {
  render() {
    return (
        <Login productName={'Control Panel'} moduleName={'Administration module'} showOpenLabBrandName={true} showDomainInput={false} />
    );
  }
}

export default App;
