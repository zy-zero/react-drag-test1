import React, { Component } from 'react';
import { Provider } from 'react-redux';
// import logo from './logo.svg';
import './App.css';
import A from './routers/A/A';
import B from './routers/B/B';
import C from './routers/C/C';
import store from './models';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div id="container1" className="container">
            <B />
            <A />
            <C />
          </div>
        </div>
      </Provider>
      
    );
  }
}

export default App;
