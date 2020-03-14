import React from 'react';
import { SectionApi } from '../services/CatalogApi';
import { Section } from '../models';

interface State {
  getSections(blockId: number): Promise<Section[]>;
}

class ApiProvider extends React.Component {
  state: State = null;

  // tslint:disable-next-line: no-any
  constructor(props: any) {
    super(props);

    this.state.getSections = SectionApi();
  }

  render() {
    return <ApiContext.Provider value={this.state.getSections}>
      {this.props.children}</ApiContext.Provider>;
  }
}

export const ApiContext = React.createContext(null);
export default ApiProvider;
export const ApiConsumer = ApiContext.Consumer;
// tslint:disable-next-line: no-any
export function withApi(Component1: any) {
  // tslint:disable-next-line: no-any
  return function withApiHoc(props: any) {
    return <ApiConsumer>{context =>
      <Component1 {...props} api={context} />}</ApiConsumer>;
  };
}
