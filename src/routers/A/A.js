import React, { Component } from 'react';
import '../style.css';
import { connect } from 'react-redux';
import { A_init, A_startDrag, A_movaDrag, A_endDrag } from '../../models/actions';

 class A extends Component {
  state = {
    AtoMouseTop: 0,
    AtoMouseLeft: 0,
    isDraged: false,
    ALeftBeforNexteMOve: 0,
    leftCount: 0,
    rightCount: 0,
    AclassNames: ['AComponent'],
  }
  // initial
  componentDidMount() {
    let divcontainer = document.getElementById('container1');
    let initLeft = (divcontainer.offsetWidth/2) - 100;
    this.props.A_init({initLeft});
    let style = document.createElement('style');
    style.type = 'text/css';
    let keyFrames = 
    '.AComponentAnimation\n'+
    '{\n'+
      'animation:animated_div 3s 1;\n'+
      '-moz-animation: animated_div 3s 1;\n'+
      '-o-animation: animated_div 3s 1;\n'+
      '-webkit-animation:animated_div 3s 1;\n'+
    '}\n'+
    '@keyframes animated_div {\n'+
      '100%	{transform: rotate(-360deg);left:'+initLeft+'px;}\n'+
    '}\n'+
    '@-webkit-keyframes animated_div {\n'+
      '100%	{-webkit-transform: rotate(-360deg);left:'+initLeft+'px;}\n'+
    '}\n'+
    '@-moz-keyframes animated_div{\n'+
    '100% {-moz-transform: rotate(-360deg);left:'+initLeft+'px;}'+
    '}\n'+
    '@-o-keyframes animated_div{\n'+
    '100% {transform: rotate(-360deg);left:'+initLeft+'px;}'+
    '}\n'
    ;
    style.innerHTML = keyFrames.replace(/A_DYNAMIC_VALUE/g, "180deg");
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  // mouse function
  start = (e) => {
    this.moveStart('container1', 'AComponent', e);
  }
  move = (e) => {
    if(this.state.isDraged){
      this.moving('container1', 'AComponent', e);
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
    this.moveStart('container1', 'AComponent', e.targetTouches[0]);
  }
  touchMove = (e) => {
    if(this.state.isDraged){
      this.moving('container1', 'AComponent', e.targetTouches[0]);
    }
  }
  touchEnd = (e) => {
    if(this.state.isDraged){
      this.moveEnd();
      this.reduction();
    }
    
  }


  // public function
  moveStart = (containerId, aId, page) => {
    let aComponent = document.getElementById(aId);
    let divcontainer = document.getElementById(containerId);
    // 获取鼠标的位置和AComponent的差值
    this.setState({
      AtoMouseTop: divcontainer.offsetTop + aComponent.offsetTop - page.pageY,
      AtoMouseLeft: divcontainer.offsetLeft + aComponent.offsetLeft - page.pageX,
      isDraged: true,
      AclassNames: ['AComponent']
    });
  }
  moving = (containerId, aId, page) => {
    // 外框
    let divcontainer = document.getElementById(containerId);
    let aComponent = document.getElementById(aId);
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
    // let aComponent = document.getElementById('AComponent');
    this.setState({
      isDraged: false,
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
    return (
      <div
        id="AComponent"
        className={this.state.AclassNames.join(" ")}
        style={{top: this.props.ATop, left: this.props.ALeft}}
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