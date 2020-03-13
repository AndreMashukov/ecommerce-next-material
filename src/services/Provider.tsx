import React from 'react';
import Api from './Api';

// tslint:disable-next-line: no-any
const defaultStore: any = null;

interface Api {
  // tslint:disable-next-line: no-any
  api: any;
}

class ApiProvider extends React.Component {
  state: Api = { api: null };

  constructor(props: Readonly<{}>) {
    super(props);
    this.state.api = Api();
    // tslint:disable-next-line: no-console
    console.log(this.state);
  }

  render() {
    return <ApiContext.Provider value={this.state.api}>{this.props.children}</ApiContext.Provider>;
  }
}

export const ApiContext = React.createContext(defaultStore);
export default ApiProvider;
export const ApiConsumer = ApiContext.Consumer;
// tslint:disable-next-line: no-any
export function withApi(Component1: any) {
  // tslint:disable-next-line: no-any
  return function withApiHoc(props: any) {
    return <ApiConsumer>{context => <Component1 {...props} api={context} />}</ApiConsumer>;
  };
}
