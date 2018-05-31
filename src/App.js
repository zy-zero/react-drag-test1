import React, { Component } from 'react';
import { Provider } from 'react-redux';
// import logo from './logo.svg';
import './App.css';
import A from './routers/A/A';
import B from './routers/B/B';
import C from './routers/C/C';
import store from './models';
class App extends Component {
  state = {
      container: {}
  }
  componentDidMount(){
    this.setState({
        container: this.refs.container
    })
  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div id="container1" className="container" ref="container">
            <B />
            <A  container={this.state.container}/>
            <C />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
