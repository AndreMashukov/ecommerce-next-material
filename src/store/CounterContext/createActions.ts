
// tslint:disable-next-line: no-any
function createActions(dispatch: any) {
  return {
    up: () => dispatch({ type: 'up' }),
    down: () => dispatch({ type: 'down' }),
    reset: () => dispatch({ type: 'reset' })
  };
}

export default createActions;