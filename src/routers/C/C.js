import React, { Component } from 'react';
import '../style.css';
import { connect } from 'react-redux';

class C extends Component {
  render() {
    return (
      <div className="CComponent">
        {this.props.C}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  C:state.entities.C,
});
const mapDispatchTpProps = {
}
export default connect(mapStateToProps, mapDispatchTpProps)(C)