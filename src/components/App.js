import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers, { initialState } from '../reducers/index';
import './App.css';
import A from './A';
import B from './B';
import C from './C';
let store = createStore(
    reducers,
    initialState,
)
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
