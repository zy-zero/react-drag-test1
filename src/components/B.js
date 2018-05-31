import React, { Component } from 'react';
import './style.css';
import { connect } from 'react-redux';

class B extends Component {
  render() {
    return (
      <div className="BComponent">
        {this.props.B}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  B:state.entities.B,
});
const mapDispatchTpProps = {
}
export default connect(mapStateToProps, mapDispatchTpProps)(B)
