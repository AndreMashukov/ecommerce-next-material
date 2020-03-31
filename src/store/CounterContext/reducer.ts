export const initialState = { count: 0 };

// tslint:disable-next-line: no-any
function reducer(state: any, action: any) {
  return new Promise(resolve => {
    setTimeout(() => {
      switch (action.type) {
        case 'up':
          resolve({ ...state, count: state.count + 1 });
          break;
        case 'down':
          resolve({ ...state, count: state.count - 1 });
          break;
        case 'reset':
          resolve({ ...initialState });
          break;
        default:
          resolve(state);
          break;
      }
    }, 1000);
  });
}

export default reducer;