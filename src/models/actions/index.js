export const A_INIT = 'A_INIT';

export const A_START = 'A_START';
export const A_MOVE = 'A_MOVE';
export const A_END = 'A_END';

export function A_init(data) {
  return {
    type: 'A_INIT',
    payload: data,
  }
}
export function A_startDrag(data) {
  return {
    type: 'A_START',
    payload: data,
  }
}
export function A_movaDrag(data) {
  return {
    type: 'A_MOVE',
    payload: data,
  }
}
export function A_endDrag(data) {
  return {
    type: 'A_END',
    payload: data,
  }
}