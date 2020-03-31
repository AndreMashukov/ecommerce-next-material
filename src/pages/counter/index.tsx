import React, {useContext} from 'react';

import { CounterContext } from '../../store/CounterContext';

const Counter = () => {
  const [counter, actions] = useContext(CounterContext);
  // tslint:disable-next-line: no-console
  console.log(`${counter} ${actions}`);

  return (
    <React.Fragment>
      <h3>Count:</h3>
    </React.Fragment>
  );
};

export default Counter;