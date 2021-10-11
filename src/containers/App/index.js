import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from '../';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faCircle } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab, faCircle, faEnvelope);

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
