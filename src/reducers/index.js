import { combineReducers } from 'redux';
import {
  A_INIT,
  A_START,
  A_MOVE,
  A_END,
} from '../actions/index';

export let initialState = {
  entities:{
    A: Math.ceil(Math.random()*10),
    ATop: 80,
    ALeft: -1,
    B: 0,
    C: 0,
    initLeft: 0,
  }
}

let reducers = combineReducers({
  entities: function(state = {}, action){
    switch(action.type){
      case A_INIT: 
      return {...state, initLeft: action.payload.initLeft, ALeft: action.payload.initLeft};
      case A_START: 
        return {...state};
      case A_MOVE:
        return {...state, ALeft: action.payload.aleft, B: action.payload.b, C: action.payload.c};
      case A_END:
        return state;
      default:
        return state;
    }
  }
});
export default reducers;