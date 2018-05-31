import React, { Component } from 'react';
import '../style.css';
import { connect } from 'react-redux';
import { A_init, A_startDrag, A_movaDrag, A_endDrag } from '../../models/actions';

 class A extends Component {
  state = {
    AtoMouseTop: 0,
    AtoMouseLeft: 0,
    isDraged: false,
    isDragedOver:false,
    container:{},
    initLeft:0,
    ALeftBeforNexteMOve: 0,
    leftCount: 0,
    rightCount: 0,
    AclassNames: ['AComponent']
  }
  componentWillReceiveProps(nextProps) {
      let initLeft = (nextProps.container.offsetWidth/2) - 100;
      if (initLeft!==this.state.initLeft){
          this.setState({
              container:nextProps.container,
              initLeft: initLeft,
          });
          this.props.A_init({initLeft});
      }
  }
  // mouse function
  start = (e) => {
    this.moveStart(e);
  }
  move = (e) => {
    if(this.state.isDraged){
      this.moving(e);
    }
    
  }
  end = (e) => {
    if(this.state.isDraged){
      this.moveEnd();
      this.reduction();
    }
  }
  leave = (e) => {
    if(this.state.isDraged){
      this.moveEnd();
      this.reduction();
    }
  }
  // touch function
  touchStart = (e) => {
    this.moveStart(e.targetTouches[0]);

  }
  touchMove = (e) => {
    if(this.state.isDraged){
      this.moving(e.targetTouches[0]);
    }
  }
  touchEnd = (e) => {
    if(this.state.isDraged){
      this.moveEnd();
      this.reduction();
    }
  }


  // public function
  moveStart = (page) => {
    let aComponent = this.refs.AComponent;
    let divcontainer = this.state.container;
    // 获取鼠标的位置和AComponent的差值
    this.setState({
      AtoMouseTop: divcontainer.offsetTop + aComponent.offsetTop - page.pageY,
      AtoMouseLeft: divcontainer.offsetLeft + aComponent.offsetLeft - page.pageX,
      isDraged: true,
      isDragedOver: false,
      AclassNames: ['AComponent']
    });
  }
  moving = (page) => {
    // 外框
    let aComponent = this.refs.AComponent;
    let divcontainer = this.state.container;
    let b = this.props.B;
    let c = this.props.C;
    let aleft = page.pageX - divcontainer.offsetLeft + this.state.AtoMouseLeft;
    if(aleft >= (divcontainer.offsetWidth - aComponent.offsetWidth) 
      && this.state.ALeftBeforNexteMOve < aleft 
      && this.state.rightCount === 0){
      // 在这里计算
      b = this.props.B + 1;
      c = this.props.C + this.props.A;
      this.setState({
        rightCount: 1,
      });
    }
    if(aleft <= 0  && this.state.ALeftBeforNexteMOve > aleft && this.state.leftCount === 0){
      b = this.props.B - 1;
      c = this.props.C - this.props.A;
      this.setState({
        leftCount: 1,
      });
    }
    if(aleft>0){
      this.setState({
        leftCount: 0,
      });
    }
    if(aleft<(divcontainer.offsetWidth - aComponent.offsetWidth)){
      this.setState({
        rightCount: 0,
      });
    }
    // 计算最大和最小边界之前，记录最后拖动的位置
    this.setState({
      ALeftBeforNexteMOve: aleft,
    });
    if(aleft >= (divcontainer.offsetWidth - aComponent.offsetWidth)){
      aleft = (divcontainer.offsetWidth - aComponent.offsetWidth);
    }
    aleft = aleft < 0 ? 0 : aleft;
    this.props.A_movaDrag({aleft, b, c});
  }
  moveEnd = ()=>{
    this.setState({
      isDraged: false,
      isDragedOver: true,
      AclassNames: ['AComponent', 'AComponentAnimation']
    });
  }
  reduction = () => {
    this.setState({
      AclassNames: ['AComponent', 'AComponentAnimation']
    });
    setTimeout(() => {
      this.props.A_movaDrag({aleft: this.props.AInitLeft, b: this.props.B, c: this.props.C});
    }, 2900);
  }
  render() {
    // this.props;
      let styleObj = {
          top: this.props.ATop,
          left: this.state.isDragedOver?this.state.initLeft:this.props.ALeft,
          transform: this.state.isDragedOver?'rotate(-360deg)':'',
          transition: this.state.isDragedOver?'all 3s':'',
      }
    return (
      <div
        id="AComponent" ref="AComponent"
        className={this.state.AclassNames.join(" ")}
        style={styleObj}
        onMouseDown={this.start}
        onMouseMove={this.move}
        onMouseUp={this.end}
        onMouseLeave={this.leave}
        onTouchStart={this.touchStart}
        onTouchMove={this.touchMove}
        onTouchEnd={this.touchEnd}
      >
        A = {this.props.A}<br/>
      </div>

    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  A: state.entities.A,
  B: state.entities.B,
  C: state.entities.C,
  ATop: state.entities.ATop,
  ALeft: state.entities.ALeft,
  AInitLeft: state.entities.initLeft,
});
const mapDispatchTpProps = {
  A_init, A_startDrag, A_movaDrag, A_endDrag, 
}
export default connect(mapStateToProps, mapDispatchTpProps)(A)